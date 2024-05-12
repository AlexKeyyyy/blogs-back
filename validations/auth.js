import {body} from 'express-validator';

export const registerValidator = [
    body('email', 'Неверно указан email').isEmail(),
    body('password', 'Пароль слишком короткий (минимум 5 символов)').isLength({min: 5}),
    body('fullName', 'Имя слишком короткое (минимум 3 символа)').isLength({min: 3}),
    body('avatarUrl', 'Это не ссылка').optional().isURL(),

]

export const loginValidator = [
    body('email', 'Неверно указан email').isEmail(),
    body('password', 'Пароль слишком короткий (минимум 5 символов)').isLength({min: 5}),
]

export const postCreateValidator = [
    body('title', 'Введите заголовок поста').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),

]