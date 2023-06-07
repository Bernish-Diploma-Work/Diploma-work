import { ChangeEvent, useState } from "react";
import { videoApi } from "../store/api/video.api";
import { useDebounce } from "./useDebounce";


export const useSearch = (resultsToShow = 4) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debounced = useDebounce(searchTerm, 500);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const {isSuccess, data} = videoApi.useGetBySearchTermQuery(searchTerm, {
        skip: !debounced,
        selectFromResult: ({data, ...rest}) => ({
           data: data?.slice(0,resultsToShow),
           ...rest
        })
    });

    return {
        handleSearch,
        searchTerm,
        data,
        isSuccess
    }

}