let js_forms = {

    is_debug: true,

    // Инициализация всех форм
    init: function () {
        let forms = document.querySelectorAll('[data-submittable="1"]');
        for (let i = 0; i < forms.length; i++) {
            this.initOne(forms[i]);
        }
    },

    // Инициализация одной формы
    initOne: function (form) {
        form.addEventListener('submit', function (event) {
            return js_forms.submit(event, form);
        }, true);
    },

    // Отправка данных формы
    submit: function (event, form) {
        event.preventDefault();

        // Отправляем форму xhr-запросом
        this.send(form);
    },

    // Выполнение запроса
    send: function (form) {
        let action = form.action;
        let method = form.method;
        let data = new FormData(form);

        let request = new XMLHttpRequest();
        request.open(method, action, false);
        request.send(data);

        this.result(request, form);
    },

    // Обработка результата запроса
    result: function (request, form) {
        // Запрос выполнился с ошибкой сервера
        if (request.status !== 200) {
            let data = {
                'success': false,
                'code': request.status,
                'message': 'Ошибка сервера ' + request.status + ', попробуйте повторить запрос позднее',
            };

            this.resultFailed(form, data);
        }

        // Валидный ответ сервера
        //let data = JSON.parse(request.responseText);
        let data = {
            'success': false,
            'message': 'Сообщение об ошибке',
        };

        this.log(data);

        if (data.success) {
            this.resultSuccess(form, data);
        } else {
            this.resultFailed(form, data);
        }
    },

    // Запрос на сервер выполнился с ошибкой
    resultFailed: function (form, data) {

        // Форма содержит callback при ошибке
        if (form.dataset.callback_failed !== undefined) {
            let functionName = form.dataset.callback_failed;
            functionName = window[functionName];

            // Вызов функции
            functionName(form, data);
        }

        // Другие возможности ответа
        this.resultCommon(form, data);
    },

    // Запрос на сервер выполнился успешно
    resultSuccess: function (form, data) {

        // Форма содержит callback при успехе
        if (form.dataset.callback_success !== undefined) {
            let functionName = form.dataset.callback_success;
            functionName = window[functionName];

            // Вызов функции
            functionName(form, data);
        }

        // Другие возможности ответа
        this.resultCommon(form, data);
    },

    // Действия, которые можно выполнить при любом исходе запроса
    resultCommon: function (form, data) {

        // В ответе - сообщение
        if (data.message !== undefined) {
            this.alert(data.message);
        }

        // В ответе - редирект
        if (data.redirect !== undefined) {
            document.location.href = data.redirect;
        }
    },

    // Вывод ошибки в интерфейс пользователя
    alert: function (message) {
        this.log(message);
        alert(message);
    },

    // Вывод лога
    log: function (message) {
        if (!this.is_debug) {
            return;
        }

        console.log(message);
    }
};

js_forms.init();