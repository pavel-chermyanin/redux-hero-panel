import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchHeroes,  } from '../../actions';
import { heroDelete } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE
const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector)


    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request))
 
        // eslint-disable-next-line
    }, []);

    // если пробрасываем функцию дочернему компоненту нужно обернуть ее useCallback
    const onHeroDelete = useCallback((id) => {

        request("http://localhost:3001/heroes/" + id, 'DELETE')
            .then(dispatch(heroDelete(id)))
            .catch(err => console.log(err))
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem
                        onDelete={() => onHeroDelete(id)}
                        {...props} />
                </CSSTransition>

            )
        })
    }
    console.log(filteredHeroes);
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            <TransitionGroup component="ul">
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;