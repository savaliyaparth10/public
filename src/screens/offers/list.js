import { OfferCarousel, FlexRowBetween } from 'components'
import { CommanContainer, FormTextSearchFormField } from 'elements'
import { GetOffersCategoryList, GetTopOffersList, GetSpotLightsList, GetOffersBySearch } from 'hooks'
import { OffersCategoryList, TopOffersList } from 'page-components'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form } from 'antd'
import styled from 'styled-components'
import { useDebounce } from 'hooks/debounce'

const SearchSchema = yup.object().shape({
    search: yup.string().trim(),
    zip: yup.string().trim(),
})

const SearchForm = styled(Form)`
    input {
        background: ${({ theme }) => theme.colors.primary} !important;
    }
    .input-height {
        .ant-input-affix-wrapper {
            height: 45px !important;
        }
    }
`
const OfferConatainer = styled.div`
.no-data {
    font-size: 16px;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    background: #0d1019;
    padding: 30px;
    margin-bottom: 35px;    
}
`
export const OffersHomeScreen = () => {
    const {
        control,watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SearchSchema),
    })
    const search = watch("search")
    const finalSearch = useDebounce(search, 1000)
    const { data: searchList,loading: searchListLoading } = GetOffersBySearch(finalSearch);
    const { data: bannerList, loading: bannerLoading } = GetSpotLightsList();
    const { data: categoryList, fetchMoreData: categoryFetchMore, hasMore: categoryhasMore } = GetOffersCategoryList()
    const { data: topofferList,loading: topOfferLoading, fetchMoreData: topofferFetchMore, hasMore: topofferhasMore } = GetTopOffersList()

    const navigate = useNavigate()

    const goToDetail = (id) => {
        navigate(`/offers/${id}`)
    }

    const navigateToOffers = (item) => {
        if (item?.CategoryId) {
            navigate(`/offers/category/${item?.CategoryId}`)
        }
    }

    useEffect(() => {
    }, [finalSearch])

    return (
        <OfferConatainer>
            <OfferCarousel
                bannerList={bannerList}
                goToDetail={goToDetail}
                loading={bannerLoading}
            />
            <CommanContainer className="container">
                <div className="my-5">
                <OffersCategoryList
                    list={categoryList}
                    fetchMoreData={categoryFetchMore}
                    hasMore={categoryhasMore}
                    goToDetail={goToDetail}
                    navigateToOffers={navigateToOffers}
                />
                </div>
                <FlexRowBetween>
                    <h4 className="pe-2 mb-4 row col justify-content-between">
                        <div className="col-12 col-sm-12 col-md-4 mb-2 mb-md-0 mb-md-4">Others Offers</div>
                        <SearchForm className="col-md-7">
                            <div className="row">
                                <div className="col-md-6 col-12 mb-2 input-height">
                                    <FormTextSearchFormField
                                        control={control}
                                        name="search"
                                        placeholder="Search"
                                        errors={errors?.search}
                                        defaultValue=""
                                    />
                                </div>
                                <div className="col-md-6 col-12 mb-2 input-height">
                                    <FormTextSearchFormField
                                        control={control}
                                        name="zip"
                                        placeholder="Zip code, Neighborhood, City"
                                        errors={errors?.zip}
                                    />
                                </div>
                            </div>
                        </SearchForm>
                    </h4>
                </FlexRowBetween>
                <TopOffersList
                    list={finalSearch ? searchList : topofferList}
                    fetchMoreData={topofferFetchMore}
                    hasMore={topofferhasMore}
                    goToDetail={goToDetail}
                    loading={topOfferLoading || searchListLoading}
                />
            </CommanContainer>
        </OfferConatainer>
    )
}
