# template-project

Заготовка проекта. <br>
Эта ветка включает себя код <strong>c использованием pug</strong>. <br>

После скачивания или клонирования в командой строке необходимо установить все пакеты, выполните <code>npm i</code> <br>

<code>gulp css:build</code>    -  компиляция scss и генерация критического css<br>
<code>gulp js:build</code>     -  сборка js <br>
<code>gulp pug:build</code>    -  компиляция pug<br>
<code>gulp fonts:build</code>  -  переносит папку src/fonts в dist/fonts <br>
<code>gulp images:build</code> -  переносит папку src/images в dist/images <br>
<code>gulp build</code>        -  выполняет таск по сборке проекта (выполняет все такски по компиляции, конкатенации и переносу) <br>
<code>gulp watch</code>        -  команда слежения за файлами <br>
<code>gulp webserver</code>    -  запуск сервера <br>
<code>gulp clean</code>        -  удаление папки dist <br>
<code>gulp</code>              -  default таск для запуска всех таксков <br>


Все пути находятся в объекте <code>path</code> в файле <code>gulpfile.js</code> <br>

Все подключаемые части расположены в папках <code>partails/</code><br>
Подключение файлов:
- scss - <code>@import 'partails/header.scss';</code>
- pug  - <code>include partails/header.pug</code>
- js   - <code>//import('partails/app.js')</code>

<br>


Для указания критичкского css используется <code> critical: this; </code>, например:

<pre>
    body {
        critical: this;
        color: #000;
        font-size: 16px;
    }
</pre>

В итоге на выходе вы получите файл <code>"имя css фала".critical.min.css</code>, в котором будет содержаться css правила, отмеченные <code> critical: this; </code>, содержимое файла необходимо поставить в тег <code>style</code> в <code>head</code>:

<pre>
    &lthead&gt
        &ltstyle&gt
            body{color:#000;font-size:16px}
        &lt/style&gt
    &lt/head&gt
</pre>


Чтобы загружать остальной css-код страницы, используется скрипт src/js/partails/loadCss.js, который я уже подключил в <code>main.js</code>

В строке <br>
<code>l.href = 'css/main.css';</code> <br> - указывам имя css файла, который нужно загрузить асинхронно




Проблемы:
-----------

- критический css приходится ставить в <code>head -> style</code> вручную

- много точек для указания пути к файлам