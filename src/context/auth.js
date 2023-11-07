import { LoaderBar } from 'components';
import { GetCountryList } from 'hooks';
import { EmailVerificationModal } from 'page-components';
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthService, BaseService, FirebaseService, MetaDataService, StorageConstant } from 'utility';
import { BrowserUtility } from 'utility/browser-utility';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [openVerifiedPopup, setOpenVerifiedPopup] = useState(false);
    const [user, setUser] = useState(null);
    const [singUpFormData, setSingUpFormData] = useState(null);
    const [profile, setProfile] = useState(null);
    const [CountryId, setCountryId] = useState(BrowserUtility.get(StorageConstant.countryId) || '');
    const [state, setState] = useState(BrowserUtility.getObj(StorageConstant.state) || {});
    const [stateList, setStateList] = useState([]);
    const { data: countryList } = GetCountryList();
    const CountryCode = BrowserUtility.get(StorageConstant.countryCode) || '';
    BaseService.setCountry(CountryCode, CountryId);
    const countryCode = useMemo(() => {
        return countryList?.find(item => item.CountryId.toString() === CountryId.toString())?.CountryShortName
    }, [CountryId, countryList])

    const [loading, setLoading] = useState(true);

    const onAuthStateChanged = async (user) => {
        if (user) {
            setUser(user);
            const token = await user.getIdToken(true);
            await AuthService.storeToken(token);
            // await AuthService.storeUser(user)
            const result = await AuthService.login({ Token: token });
            const profile = result.Result;
            setProfile({
                CellPhone: profile.CellPhone,
                CellPhoneCountryCode: profile.CellPhoneCountryCode,
                CountryCode: profile.CountryCode,
                CustomerUId: profile.CustomerUId,
                DefaultProfile: profile.DefaultProfile,
                Email: profile.Email,
                FirstName: profile.FirstName,
                FullName: profile.FullName,
                LastName: profile.LastName,
                ProfilePicture: profile.ProfilePicture,
                ProviderType: profile.ProviderType,
                SignInProvider: profile.SignInProvider,
                Id: profile.Id,
            })
            setIsAuthenticated(true);
            setOpenVerifiedPopup(!user.emailVerified)
        } else {
            setIsAuthenticated(false);
            setUser(null)
        }
        if (loading) setLoading(false);
    }

    useEffect(() => {
        const subscriber = FirebaseService.auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    useEffect(() => {
        if (countryCode) {
            BrowserUtility.save(StorageConstant.countryId, CountryId);
            BrowserUtility.save(StorageConstant.countryCode, countryCode);
            BaseService.setCountry(countryCode, CountryId);
            MetaDataService.getState({ CountryId }).then((data) => {
                setStateList(data.Result);
                if (CountryId !== state?.CountryId?.toString()) {
                    const stateObj = data.Result?.filter(d => d.IsDefault)[0] || data.Result[0] || undefined;
                    if (stateObj) setState({ label: stateObj.StateName, value: stateObj.StateId.toString(), ...stateObj });
                    else setState({ CountryId });
                }
            })
        }
    }, [countryCode]);
    useEffect(() => {
        if (state) {
            BaseService.setState(state);
            BrowserUtility.saveObj(StorageConstant.state, state)
        }
    }, [state]);
    useEffect(() => {
        const countryId = BrowserUtility.get(StorageConstant.countryId);
        if (countryId) setCountryId(countryId);
        const state = BrowserUtility.getObj(StorageConstant.state);
        if (state) setState(state);
    }, [])
    useEffect(() => {
        let authTokenTimeInterval = null;
        if (user) {
            authTokenTimeInterval = setInterval(() => {
                AuthService.refreshToken().then(token => AuthService.storeToken(token)).catch(console.log);
            }, 10 * 60 * 1000);
        }
        return () => {
            if (authTokenTimeInterval) {
                clearInterval(authTokenTimeInterval);
            }
        }
    }, [user]);
    useEffect(() => {
        if (!CountryId && countryList) {
            const country = countryList?.find(item => item.IsDefault);
            if (country) {
                setCountryId(country.CountryId.toString())
            }
        }
    }, [countryList])
    useEffect(() => {
        const singUp = async () => {
            try {
                await AuthService.updateUser({
                    CustomerUId: singUpFormData.CustomerUId,
                    FullName: singUpFormData.FullName,
                    CellPhone: singUpFormData.CellPhone,
                });
                setProfile({
                    ...profile,
                    CellPhone: singUpFormData.CellPhone,
                    FullName: singUpFormData.FullName,
                })
                await AuthService.sendOTP({ Email: singUpFormData.Email });
                setSingUpFormData(null);
            } catch (error) {
                console.log(error);
            }
        }
        if (singUpFormData && isAuthenticated) singUp();
    }, [singUpFormData, isAuthenticated])
    const logout = () => {
        AuthService.logout();
        FirebaseService.auth.signOut()
    }

    const updatePassword = (password) => {
        FirebaseService.updateUserPassword(password.confirmPassword)
    }

    const closeModal = () => {
        setOpenVerifiedPopup(false)
    }

    const contextData = useMemo(() => ({
        loading, user, profile, isAuthenticated, logout, updatePassword, setCountryId, countryCode, CountryId, countryList, state, setState, stateList, setSingUpFormData,
    }), [
        loading, user, profile, isAuthenticated, logout, updatePassword, setCountryId, countryCode, CountryId, countryList, state, setState, stateList, setSingUpFormData,
    ])
    return (
        <AuthContext.Provider value={contextData}>
            <>
                {children}
                <EmailVerificationModal
                    open={openVerifiedPopup}
                    closeModal={closeModal}
                />
            </>
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({
    redirectPath = '/',
    children,
}) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <LoaderBar />
    }
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />
    }

    return (<>
        {children}
    </>)
}
