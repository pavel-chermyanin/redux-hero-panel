import { Formik, Form, Field, ErrorMessage, } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { filtersFetched, heroAdd } from '../../actions';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const filters = useSelector(state => state.filters)

    const dispatch = useDispatch();
    const { request } = useHttp();

    const onAddNewCharacter = (values) => {
        const id = uuid();
        const newItem = {
            id,
            name: values.name,
            description: values.text,
            element: values.element
        }
        
        request("http://localhost:3001/heroes/", 'POST', JSON.stringify(newItem))
            .then(dispatch(heroAdd(newItem)))
    }


    return (
        <Formik
            initialValues={{
                name: '',
                text: '',
                element: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Обязательное поле'),
                text: Yup.string()
                    .required('Обязательное поле'),
                element: Yup.string()
                    .required('Обязательное поле'),
            })}
            onSubmit={(values, {resetForm}) => {
                onAddNewCharacter(values);
                resetForm()
            }}>
            {() => (
                <Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <Field type="text" name="name" className="form-control" placeholder="Как меня зовут?" />
                        <ErrorMessage name="name" component="div" />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label fs-4">Описание</label>
                        <Field
                            as="textarea"
                            type="text"
                            name="text"
                            className="form-control"
                            placeholder="Что я умею?"
                            style={{ "height": '130px' }}
                        />
                        <ErrorMessage name="text" component="div" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <Field
                            as="select"
                            className="form-select"
                            name="element">
                            <option >Я владею элементом...</option>
                            {filters.slice(1).map(item =>  <option key={item.name} value={item.name}>{item.label}</option>)}
                        </Field>
                        <ErrorMessage name="element" component="div" />
                    </div>

                    <button type="submit" className="btn btn-primary">Создать</button>
                </Form>
            )}
        </Formik>

    )
}

export default HeroesAddForm;