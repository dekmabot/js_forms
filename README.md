# Скрипт отправки форма

Данный скрипт написан на javascript, он подключается к формам с атрибутам data-submittable="1" и обрабатывает отправку данных.

Codepen: https://codepen.io/dekmabot/pen/gOpJPNe

Подключение обработки черех дата-атрибуты у элемента form:

`data-submittable="1"` - подключить обработчик формы

Отправка формы поддерживает отображение сообщения и редирект на страницу, а также вызов коллбэков в случае успеха и в случае ошибки.<br>
Функции коллбэка могу принимаь значения: `functionName(form, data)`

`data-callback_success="functionName"` - callback при успешной отправке формы

`data-callback_failed="functionName"` - callback при ошибке отправки формы,


