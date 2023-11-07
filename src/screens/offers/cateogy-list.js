import { CommanContainer, FormTextSearchFormField } from 'elements'
import { TopOffersList } from 'page-components'
import { useParams,useNavigate } from 'react-router-dom'
import { DangerText, FlexRowBetween } from 'components'
import { GetOffersBySearch } from 'hooks'
import React from 'react'
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
`
export const CategoryListScreen = () => {
    const {
        control, watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SearchSchema),
    })
    const navigate = useNavigate()
    const search = watch("search")
    const finalSearch = useDebounce(search, 1000)
    const { id } = useParams()
    const { data: searchList, loading: searchListLoading, hasMore, fetchMoreData, fetchAll } = GetOffersBySearch(finalSearch, { OfferCategoryIds: id });

    const goToDetail = (id) => {
        navigate(`/offers/${id}`)
    }

    return (
        <CommanContainer className="container my-5">
            <FlexRowBetween>
                <h4 className="pe-2 mb-4 row col justify-content-between">
                    <div className="col-12 col-sm-12 col-md-4 mb-2 mb-md-0 mb-md-4">Category Offers</div>
                    <SearchForm className="col-md-7">
                        <div className="row">
                            <div className="col-md-5 col-12 mb-2">
                                <FormTextSearchFormField
                                    control={control}
                                    name="search"
                                    placeholder="Search"
                                    errors={errors?.search}
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-md-5 col-12 mb-2">
                                <FormTextSearchFormField
                                    control={control}
                                    name="zip"
                                    placeholder="Zip code, Neighborhood, City"
                                    errors={errors?.zip}
                                />
                            </div>
                            <DangerText
                                className="pointer col-12 col-md-2"
                                onClick={() => hasMore && fetchAll()}
                            >
                                View All
                            </DangerText>
                        </div>
                    </SearchForm>
                </h4>
            </FlexRowBetween>
            <TopOffersList
                list={searchList}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
                loading={searchListLoading}
                goToDetail={goToDetail}
            />
        </CommanContainer>
    )
}
