import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { videoApi } from "../../../store/api/video.api";
import { setTabTitle } from "../../../utils/generalUtils";
import { Catalog } from "../../ui/SuspenseWrapper";

const SearchResult: FC = () => {
  setTabTitle("Search");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  const { isLoading, data } = videoApi.useGetBySearchTermQuery(searchTerm!, {
    skip: !searchTerm,
    selectFromResult: ({ data, ...rest }) => ({
      data: data?.slice(0, 25),
      ...rest,
    }),
  });

  return (
    <Catalog
      videosToRender={data || []}
      title={`Результати пошуку: ${searchTerm}`}
      isLoading={isLoading}
    />
  );
};

export default SearchResult;
