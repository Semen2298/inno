'use strict';

// Keep the header height stable; its own position cannot become the scroll threshold.
const header = document.querySelector('.header');
if (header) {
  const updateHeader = () => header.classList.toggle('fixed', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const toggle = header.querySelector('.header__toggle');
  const menu = header.querySelector('#main-menu');
  const mobile = window.matchMedia('(max-width: 760px)');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.querySelector('img').src = 'img/icon-menu.svg';
    menu.hidden = mobile.matches;
  };
  const updateMenu = () => {
    toggle.hidden = !mobile.matches;
    closeMenu();
  };
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.querySelector('img').src = open ? 'img/icon-x.svg' : 'img/icon-menu.svg';
    menu.hidden = !open;
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobile.matches && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });
  mobile.addEventListener('change', updateMenu);
  updateMenu();
}

const study = document.querySelector('#study');
if (study) {
  const image = study.querySelector('.study__image');
  const caption = study.querySelector('.study__caption');
  const status = study.querySelector('.study__status');
  const buttons = [...study.querySelectorAll('[data-view]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const views = {
    courtyard: {
      alt: 'Courtyard house exterior in pale limestone with oak screens',
      caption: 'Exterior · Sheltered rooms arranged around a planted courtyard.',
    },
    living: {
      alt: 'Oak-framed living room opening onto a planted inner courtyard',
      caption: 'Interior · Daylight and a direct connection to the garden.',
    },
    materials: {
      alt: 'Oak window reveal, limestone wall and a built-in upholstered bench',
      caption: 'Details · Warm oak, pale stone and a useful place to pause.',
    },
  };
  let request = 0;
  let animation;
  study.querySelector('.study__controls').hidden = false;
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const view = button.dataset.view;
      const ticket = ++request;
      const nextImage = new Image();
      status.textContent = 'Loading the selected view…';
      study.setAttribute('aria-busy', 'true');
      nextImage.sizes = image.sizes;
      nextImage.srcset = [480, 800, 1200]
        .map((width) => `img/${view}-${width}.webp ${width}w`)
        .join(', ');
      nextImage.src = `img/${view}-1200.webp`;
      try {
        await nextImage.decode();
        if (ticket !== request) return;
        image.srcset = nextImage.srcset;
        image.src = nextImage.src;
        image.alt = views[view].alt;
        caption.textContent = views[view].caption;
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        animation?.cancel();
        if (!reducedMotion.matches) {
          animation = image.animate(
            [
              { opacity: 0.65, transform: 'translateX(6px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 240, easing: 'ease-out' },
          );
        }
        status.textContent = views[view].caption;
      } catch {
        if (ticket === request) status.textContent = 'This view could not load. Please try again.';
      } finally {
        if (ticket === request) study.removeAttribute('aria-busy');
      }
    });
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) animation?.cancel();
  });
}

document.querySelectorAll('.form').forEach((form) => {
  const fields = [...form.querySelectorAll('[required]')];
  const summary = form.querySelector('.form__errors');
  const list = summary.querySelector('ul');
  const messages = {
    name: 'Enter your name.',
    email: 'Enter a valid email address.',
    message: 'Tell us a little about your space.',
    privacy: 'Please confirm you have read the privacy notice.',
  };
  let attempted = false;
  const validate = (field) => {
    const valid =
      field.type === 'checkbox'
        ? field.checked
        : field.value.trim().length > 0 && field.validity.valid;
    const error = form.querySelector(`#${field.id}-error`);
    field.setAttribute('aria-invalid', String(!valid));
    error.hidden = valid;
    error.textContent = valid ? '' : messages[field.name];
    return valid;
  };
  const updateSummary = () => {
    const invalid = fields.filter((field) => field.getAttribute('aria-invalid') === 'true');
    list.replaceChildren();
    invalid.forEach((field) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = messages[field.name];
      link.addEventListener('click', (event) => {
        event.preventDefault();
        field.focus();
      });
      item.append(link);
      list.append(item);
    });
    summary.hidden = !invalid.length;
  };
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (attempted) {
        validate(field);
        updateSummary();
      }
    });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    attempted = true;
    const valid = fields.map(validate).every(Boolean);
    updateSummary();
    if (!valid) {
      summary.focus();
      return;
    }
    // This static portfolio has no delivery service. Never put personal data in the URL.
    form.reset();
    window.location.assign('thanks.html');
  });
  form.querySelector('fieldset').disabled = false;
});
