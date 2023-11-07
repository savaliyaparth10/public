import { AuthProvider } from 'context'
import { GlobalStyles } from 'global'
import {
    BrowserRouter as Router,
    Outlet,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { FirebaseService, theme } from 'utility'
import {
    AddEditEventScreen,
    Home,
    EventsListScreen,
    EventsDetailScreen,
    ProfileScreen,
    SelectSeats,
    TicketSummaryScreen,
    TicketDetailScreen,
    BuyTicketScreen,
    MapScreen,
    DisclaimerScreen,
    PrivacyPolicyScreen,
    ReturnPolicyScreen,
    TermConditionScreen,
    TicketPaymentScreen,
    SearchEventScreen,
    ContactUsScreen,
    SoldTicketDetails,
    OffersHomeScreen,
    OffersDetailScreen,
    BuyTicketScreenOffer,
    OfferPaymentScreen,
    OfferSummary,
    AboutUsScreen,
    Approval,
    SponsorTicketScreen,
} from 'screens'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Layout } from 'layout'
import { useEffect } from 'react'
import { CategoryListScreen } from 'screens/offers/cateogy-list'

FirebaseService.init()

function App() {
    const themeMode = theme
    return (
        <ThemeProvider theme={themeMode}>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="dark"
            />
            <AuthProvider>
                <GlobalStyles />
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Outlet />}>
                                <Route index element={<Home />} />
                                <Route path="sponsor" element={<Outlet />}>
                                    <Route
                                        index
                                        element={<SponsorTicketScreen />}
                                    />
                                </Route>
                                <Route path="events" element={<Outlet />}>
                                    <Route
                                        index
                                        element={<EventsListScreen />}
                                    />
                                    <Route
                                        path="category/:category"
                                        element={<SearchEventScreen />}
                                    />
                                    <Route
                                        path="approval"
                                        element={<Approval />}
                                    />
                                    <Route
                                        path=":id"
                                        element={<EventsDetailScreen />}
                                    />
                                    <Route
                                        path="create"
                                        element={<AddEditEventScreen />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<AddEditEventScreen />}
                                    />
                                    <Route
                                        path="sold-ticket/:id"
                                        element={<SoldTicketDetails />}
                                    />

                                    <Route
                                        path="/events/buy-ticket/:id"
                                        element={<BuyTicketScreen />}
                                    />
                                </Route>
                                <Route path="offers" element={<Outlet />}>
                                    <Route
                                        index
                                        element={<OffersHomeScreen />}
                                    />
                                    <Route
                                        path=":id"
                                        element={<OffersDetailScreen />}
                                    />
                                    <Route
                                        path="category/:id"
                                        element={<CategoryListScreen />}
                                    />
                                    <Route
                                        path="cart"
                                        element={<BuyTicketScreenOffer />}
                                    />
                                    <Route
                                        path="payment/:ticketBucketId"
                                        element={<OfferPaymentScreen />}
                                    />
                                    <Route
                                        path="summary/:ticketBucketId"
                                        element={<OfferSummary />}
                                    />
                                </Route>
                                <Route path="profile" element={<Outlet />}>
                                    <Route index element={<ProfileScreen />} />
                                    <Route
                                        path=":id"
                                        element={<ProfileScreen />}
                                    />
                                </Route>
                                <Route path="ticket" element={<Outlet />}>
                                    <Route
                                        path="select-seats/:ticketBucketId"
                                        element={<SelectSeats />}
                                    />
                                    <Route
                                        path="confirmation/:ticketBucketId"
                                        element={<TicketSummaryScreen />}
                                    />
                                    <Route
                                        path="payment/:ticketBucketId"
                                        element={<TicketPaymentScreen />}
                                    />
                                    <Route
                                        path="summary/:ticketBucketId"
                                        element={<TicketDetailScreen />}
                                    />
                                    <Route
                                        path="map/:ticketBucketId"
                                        element={<MapScreen />}
                                    />
                                </Route>
                                <Route
                                    path="contact-us"
                                    element={<ContactUsScreen />}
                                />
                                <Route
                                    path="disclaimer"
                                    element={<DisclaimerScreen />}
                                />
                                <Route
                                    path="privacy-policy"
                                    element={<PrivacyPolicyScreen />}
                                />
                                <Route
                                    path="return-policy"
                                    element={<ReturnPolicyScreen />}
                                />
                                <Route
                                    path="term-condition"
                                    element={<TermConditionScreen />}
                                />
                                <Route
                                    path="about-us"
                                    element={<AboutUsScreen />}
                                />
                            </Route>
                        </Routes>
                    </Layout>
                    <ScrollToTop />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
}

function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        const body = document.querySelector('#root')
        body.scrollIntoView(
            {
                behavior: 'instant',
            },
            500,
        )
    }, [pathname])

    return null
}

export default App
