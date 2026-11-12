# INNO — проверка по The $10K Checklist

Дата: 9 ноября 2026. Область работы: пять страниц `inno`, изображения, шрифты, CSS и JavaScript. Стек остался прежним: HTML, CSS, JavaScript без библиотек. Проверка выполнена по восьми критериям пользовательского PDF, а не как независимая сертификация стоимости сайта.

## Результат по восьми пунктам

| Критерий PDF | Результат | Что проверено / сделано |
| --- | --- | --- |
| 01. Собственное направление | Выполнено | Сохранена существующая композиция: светлые секции, песочный акцент, три перекрывающие первый экран карточки, смещённая рамка фотографии, угловые карточки услуг, перекрытие фотографии и панели исследования дома. Новое взаимодействие связано с архитектурой: три взгляда на дом. |
| 02. Работающая типографика | Выполнено | Questrial для заголовков и Source Sans 3 для основного текста. Локальные WOFF2, исправлен невалидный descriptor исходного шрифта, предварительная загрузка обоих файлов. Заголовки без случайных цветных слов; масштаб меняется адаптивно. |
| 03. Сдержанная палитра | Выполнено | Пять базовых цветов: белый, светло-серый, угольный, песочный, серый текста. Тёмный песочный используется для читаемых ссылок на белом. Красный оставлен только для ошибок формы. |
| 04. Иерархия и воздух | Выполнено | Один h1 и main на странице, последовательные h2/h3, видимые подписи формы. Убраны фиксированная высота услуг и исчезающие при наведении действия. Контентные блоки растут вместе с текстом. |
| 05. Осмысленные изображения | Выполнено | Все используемые старые фотографии заменены: 11 новых архитектурных, студийных и портретных кадров. Новый прозрачный знак N, PNG/ICO/apple-touch favicon. Низкокачественные растровые иконки заменены готовыми SVG Lucide. Исходные фотографии сохранены в проекте и больше не подключены. |
| 06. Сдержанное движение | Выполнено | Переключение ракурсов после декодирования изображения, короткая смена кадра 240 мс, аккуратная заливка кнопок, поворот стрелки этапов. Нет автопрокрутки, параллакса, глобального fade-up или анимированных выдуманных цифр. Учитывается prefers-reduced-motion, включая изменение настройки во время работы. |
| 07. Мобильная версия | Выполнено на браузерном стенде | 80 проверок компоновки: 5 страниц × 16 ширин от 320 до 1920 px. Отдельные мобильные раскладки, раскрываемое меню, доступные без hover действия. Сенсорная эмуляция, клавиатура, увеличенный текст и интервалы. Реальное устройство не проверялось. |
| 08. Скорость, доступность, метаданные | Выполнено с ограничением скорости | Семантика, управление клавиатурой, контраст, title/description/Open Graph, отсутствие ошибок ресурсов проверены. В холодном замедленном профиле LCP 2,10 с и load 2,21 с: строгую цель PDF «меньше 2 секунд» для этого профиля пока нельзя отметить выполненной. |

## Фактические проверки

- 126 браузерных проверок завершились успешно, исключений приложения и отсутствующих ресурсов не найдено.
- Страницы: `index.html`, `about.html`, `privacy-policy.html`, `terms-conditions.html`, `thanks.html`.
- Ширины: 320, 375, 390, 480, 481, 600, 760, 761, 768, 990, 991, 1024, 1100, 1101, 1440, 1920 px. Горизонтального скролла и обрезания проверяемых заголовков/кнопок нет.
- Проверены меню, Escape, стабильная высота шапки при прокрутке, переход skip-link с фокусом на main.
- Исследование дома: три кадра, aria-pressed, быстрое переключение с сохранением последнего выбора, reduced motion и сенсорное управление.
- Этапы работы раскрываются нативными details/summary, в том числе Enter с клавиатуры.
- Обе формы: четыре обязательных поля, пробельные строки, неверный email, согласие, ссылки из сводки ошибок, фокус на сводке, успешный переход без данных в URL и без POST-запроса.
- Форма демонстрационная: серверного обработчика в исходном проекте нет. Добавлены честные пояснения на форме и странице подтверждения. Ничего не отправляется и не сохраняется. Без JavaScript форма отключена с объяснением, навигация и контент доступны.
- На основных страницах проверен основной текст 200% с увеличенными межбуквенными/межсловными интервалами и расстояниями между абзацами: скролла по горизонтали и обрезанного текста нет.
- axe-core: на всех пяти страницах 0 найденных нарушений в проверках WCAG 2 A/AA и 2.1 AA. Контраст поверх изображений требует ручной оценки и отдельно проверен визуально и расчётом подложек. Это не заявление о полном соответствии всем требованиям WCAG.
- Примеры контраста: основной текст 6,19:1; тёмный акцент на белом 6,38:1; текст песочной панели 6,41:1; ошибки 7,13:1. Затемнение шапки обеспечивает не менее 7,23:1 для белого текста даже поверх белого изображения; мобильного первого экрана — около 6,79:1.
- HTML разобран парсером, проверены 186 локальных путей/якорей/CSS URL и XML SVG. JavaScript прошёл `node --check`. Форматирование проверено Prettier.
- Скриншоты главной и страницы студии просмотрены на desktop и mobile. Накладка на фотографии студии перенесена вниз, чтобы не перекрывать лица.

## Скорость

Стенд: Chrome, локальный HTTP-сервер без сжатия, отключённый кеш, 390×844, DPR 1. Медленный профиль: 1,6 Мбит/с, задержка 150 мс, CPU ×4. В ресурсы включены запросы проекта; фоновая инъекция установленного на компьютере защитного ПО не считается функциональностью сайта.

| Профиль | LCP | loadEventEnd | CLS | Ресурсы проекта без HTML |
| --- | --- | --- | --- | --- |
| Локальная сеть | 0,07 с | 0,06 с | 0 | 159,5 кБ |
| Холодный замедленный мобильный | 2,10 с | 2,21 с | 0 | 159,5 кБ |

Фотографии имеют WebP-варианты 480/800/1200 px, широкие кадры также 1600 px. Первый экран получает высокий приоритет; нижние фотографии и фоновые кадры загружаются отложенно. Суммарная начальная загрузка ресурсов снижена с примерно 525 до 160 кБ. Замер относится к этому стенду, а не к будущему хостингу. После публикации нужно проверить реальный домен, сжатие, кеширование, сеть и устройство; полный результат «до 2 секунд» сейчас не заявляется.

Для опубликованного домена также следует добавить фактические абсолютные canonical/og:url/og:image. Адрес хостинга не выдумывался.

## Контент и источники

Текст переписан с акцентом на обычную жизнь в доме, понятные проектные решения и процесс. Убраны неподтверждённые 2010 год, противоречивые 10/25 лет опыта, тысячи клиентов, проектов и наград, а также анонимная цитата. Команда и архитектурные сцены обозначены как иллюстративные. Исходные контакты сохранены с пояснением о демонстрационном характере. Правовые страницы теперь описывают фактическую работу этой версии.

- Иконки: https://github.com/lucide-icons/lucide — готовые SVG скачаны из официального репозитория, лицензия в `img/lucide-LICENSE.txt`. Иконки вручную не рисовались.
- Questrial: исходный локальный шрифт, лицензия `fonts/OFL.txt`.
- Source Sans 3: https://github.com/google/fonts/tree/main/ofl/sourcesans3 — лицензия `fonts/SourceSans3-OFL.txt`.
- Изображения: встроенный генератор изображений, новые генерации без входных изображений. Pillow использован только для изменения размера, экспорта WebP и производных favicon. Используемые финальные файлы находятся в `img/`, а не во внешнем каталоге генератора.

## Набор промптов и сохранённые изображения

Каждый архитектурный промпт ниже — точная конкатенация общего префикса A и соответствующего суффикса. Для портретов используется префикс P. Исключения (drawings и logo) приведены полностью.

**A:**

> Use case: photorealistic-natural. Architectural photograph for a fictional residential architecture studio named INNO. Believable contemporary building, real structural logic and natural materials, beautifully photographed rather than an extravagant AI render. Palette: pale limestone, warm natural oak, bronze details, soft off-white and quiet landscaping. Restrained daylight and natural shadows, accurate straight architectural lines, no impossible stairs, no random protrusions, no lettering, logos, watermark or collage.

**P:**

> Use case: photorealistic-natural. Square environmental portrait for a fictional architecture studio website. Honest natural skin and hair, believable face and ordinary hands, quiet confident expression, not a glamorous beauty ad. Frame waist-up with generous space above head and around shoulders. Consistent softly blurred background of an oak model-making studio with warm grey plaster, architectural models and daylight. Relaxed contemporary work clothes, no suits or hard hats, no text, logo or watermark.

### living — img/living-{480,800,1200,1600}.webp

A + Wide landscape 16:9 composition. A calm generous living room opening onto a planted inner courtyard of a two-storey limestone house. Deep oak window reveals, low linen seating, a modest timber table, a large sliding glass wall on the right with complete courtyard view. Subdued quiet left third suitable for white overlay text, richest architecture and daylight on the right. Warm, spacious and realistically lived-in, no people.

### courtyard — img/courtyard-{480,800,1200}.webp

A + Square composition showing the complete two-storey courtyard house from outside. Simple interlocking pale limestone volumes, oak slatted sun screens and a double-height glass opening looking into a planted courtyard. Include the full building comfortably inside frame, visible ground plane, restrained plants, beautiful overcast daylight, no people or cars. This is a real modestly sized architect-designed home, not a palace.

### materials — img/materials-{480,800,1200}.webp

A + Square editorial close-up of a well-designed junction between an oak window reveal, a pale limestone wall and a built-in timber bench. A small patch of courtyard daylight falls across the wall. Rich authentic grain and stone texture, beautifully resolved edges, a glimpse of soft linen upholstery. No people, no random decorative clutter, materials and craft are the subject.

### studio — img/studio-{480,800,1200,1600}.webp

A + Wide 16:9 architectural photograph of a small welcoming architecture studio, a long oak working table with unmarked drawings and one carefully made house model, daylight through tall windows, material sample shelves, a few practical chairs and quiet plaster walls. Thoughtful real workplace, not a corporate boardroom. No people, no writing or visible computer UI.

### worktable — img/worktable-{480,800,1200}.webp

A + Square editorial photo of two architects quietly reviewing a cardboard courtyard-house model and pale stone/oak samples at a working table. An adult woman with short dark hair and an adult man with curly dark hair in simple linen and cotton work clothes. Candid conversation with natural faces and normal hands, no staring at camera, all heads and hands comfortably inside frame. Daylit real architecture studio, precise modest model, no writing or company logos.

### drawings — img/drawings-{480,800,1200,1600}.webp

Use case: ads-marketing. Wide 16:9 overhead architectural still life for a dark website section. Real unmarked architectural line drawings on charcoal drafting paper, a small pale cardboard courtyard-house model, a brass scale ruler and two restrained oak/stone samples. Clean coherent courtyard plan and elevation lines, fine subtle pencil traces. Near-black charcoal and sand tones with generous quiet negative space for overlay text. Photographic texture, no cosmic diagrams, no readable numbers or words, no logos or watermarks.

### evening — img/evening-{480,800,1200,1600}.webp

A + Wide 16:9 exterior photograph of a complete two-storey pale limestone courtyard home at blue hour, warm light gently glowing through the courtyard glazing, oak sun screens and simple planted path. Realistic construction, no futuristic cantilevers. Full building inside frame, quiet darker foreground for website text overlay. No people, no cars.

### maya — img/maya-{480,800,1200}.webp

P + Subject: a woman architect in her mid-thirties with medium brown skin, shoulder-length dark hair and a simple charcoal cotton shirt. She rests one hand naturally beside a cardboard model, warm direct but understated expression.

### jonah — img/jonah-{480,800,1200}.webp

P + Subject: a white man in his early forties, short curly brown hair and light stubble, wearing a plain muted olive overshirt. He stands casually with one hand resting on a worktable, calm approachable expression.

### lea — img/lea-{480,800,1200}.webp

P + Subject: an East Asian woman interior designer in her early thirties with a neat short dark bob, wearing a simple ivory linen shirt. She holds one small oak finish sample naturally near the worktable, gentle attentive expression.

### daniel — img/daniel-{480,800,1200}.webp

P + Subject: a Black man studio lead in his late forties, closely cropped salt-and-pepper hair, wearing a plain navy knit top. Seated naturally at a model-making table, calm friendly expression, no exaggerated crossed-arm corporate pose.

### mark — img/inno-mark.png, favicon.png, favicon.ico, apple-touch-icon.png

Прозрачная генерация, альфа-канал сохранён. Убраны только прозрачные поля для производных размеров.

Use case: logo-brand. Asset type: square architectural studio logo symbol on genuinely transparent background. Create one distinctive, very simple monolithic N-shaped architectural monogram for INNO: two vertical rectangular piers connected by one diagonal structural stroke, with a small precisely aligned negative-space notch evoking a doorway. Flat solid warm sand #CDA274 only, strong clean geometry, consistent substantial stroke width, balanced compact silhouette readable at 16 pixels. Center the symbol with generous transparent padding. No gradients, texture, shadows, 3D, thin lines, extra letters, words, caption, mockup or watermark. One symbol only.
