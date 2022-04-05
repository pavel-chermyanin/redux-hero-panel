
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters, activeFilterChanged } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";
// Представьте, что вы попросили бэкенд-разработчика об этом
const HeroesFilters = () => {

    const dispatch = useDispatch();
    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request))

        // eslint-disable-next-line
    }, []);

    return (
        <>
            {/* {filtersLoadingStatus === 'loading' ? <Spinner /> : null} */}
            <div className="card shadow-lg mt-4">
                <div className="card-body">
                    <p className="card-text">Отфильтруйте героев по элементам</p>
                    <div className="btn-group">
                        {filters.map(item => {
                            const btnClass = classNames('btn', item.className, {
                                'active': item.name === activeFilter
                            })
                            return (
                                <button
                                    onClick={() => dispatch(activeFilterChanged(item.name))}
                                    key={item.name}
                                    className={btnClass}>
                                    {item.label}
                                </button>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroesFilters;