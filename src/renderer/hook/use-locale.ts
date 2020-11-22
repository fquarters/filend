import { useSelector } from "react-redux";
import Selectors from "../main/store/data/selectors";

const useLocale = () => useSelector(Selectors.locale)

export default useLocale