import { products, guideChoices } from './products.js';
import { siteConfig } from './site.config.js';
import { createProjectSummary, isValidWhatsAppNumber, whatsAppUrl } from './contact.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const productById = (id) => products.find((item) => item.id === id);
const tabs = $$('.product-tab');
let activeProduct = products[0];
const panel = $('#product-panel');
const dialog = $('#product-dialog');
const contactEnabled = isValidWhatsAppNumber(siteConfig.whatsappNumber);
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let changeTimer;
let dialogTrigger;

function checkIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#icon-check');
  svg.append(use);
  return svg;
}

function setUses(list, uses) {
  const fragment = document.createDocumentFragment();
  uses.forEach((text) => {
    const item = document.createElement('li');
    item.append(checkIcon(), document.createTextNode(text));
    fragment.append(item);
  });
  list.replaceChildren(fragment);
}

function updateProductQuery(id) {
  const url = new URL(window.location.href);
  url.searchParams.set('produto', id);
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

function selectProduct(id, { query = true, focusTab = false } = {}) {
  const product = productById(id);
  if (!product) return;
  activeProduct = product;
  tabs.forEach((tab) => {
    const selected = tab.dataset.product === id;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  const selectedTab = $(`#tab-${id}`);
  panel.setAttribute('aria-labelledby', selectedTab.id);
  panel.style.setProperty('--product-color', product.color);
  panel.style.setProperty('--product-soft', product.softColor);
  $('#product-image').src = `/assets/products/${id}.webp`;
  $('#product-image').alt = `Embalagem TEKNOFIX ${product.name} de 20 kg`;
  $('.product-stage-category').textContent = product.category === 'Massa pronta' ? 'PRONTA' : product.category;
  $('#product-name').textContent = product.name;
  $('#product-context').textContent = product.context;
  $('#product-tagline').textContent = product.label;
  $('#product-description').textContent = product.description;
  setUses($('#product-uses'), product.uses);
  $('#interest').value = id;
  if (!motionReduced) {
    clearTimeout(changeTimer);
    panel.classList.remove('is-changing');
    requestAnimationFrame(() => {
      panel.classList.add('is-changing');
      changeTimer = setTimeout(() => panel.classList.remove('is-changing'), 550);
    });
  }
  if (query) updateProductQuery(id);
  if (focusTab) selectedTab.focus({ preventScroll: true });
  if (window.innerWidth <= 760) {
    const list = $('.product-tabs');
    list.scrollTo({ left: selectedTab.offsetLeft - list.offsetLeft - (list.clientWidth - selectedTab.offsetWidth) / 2, behavior: motionReduced ? 'auto' : 'smooth' });
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProduct(tab.dataset.product));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectProduct(tabs[next].dataset.product, { focusTab: true });
    }
  });
});

$$('[data-product-link]').forEach((link) => link.addEventListener('click', () => selectProduct(link.dataset.productLink)));

$$('[data-guide]').forEach((button) => {
  button.addEventListener('click', () => {
    const choice = guideChoices[button.dataset.guide];
    if (!choice) return;
    $$('[data-guide]').forEach((option) => {
      const selected = option === button;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    $('#guide-result-title').textContent = choice.title;
    $('#guide-result-text').textContent = choice.text;
    $('#guide-result-link').dataset.productLink = choice.productId;
  });
});

$('#details-button').addEventListener('click', (event) => {
  dialogTrigger = event.currentTarget;
  $('#dialog-title').textContent = activeProduct.name;
  $('#dialog-description').textContent = activeProduct.description;
  $('#dialog-caution').textContent = activeProduct.caution;
  $('#dialog-image').src = `/assets/products/${activeProduct.id}.webp`;
  $('#dialog-image').alt = `TEKNOFIX ${activeProduct.name}, 20 kg`;
  dialog.style.setProperty('--product-soft', activeProduct.softColor);
  dialog.style.setProperty('--product-color', activeProduct.color);
  setUses($('#dialog-uses'), activeProduct.uses);
  dialog.showModal();
  document.body.classList.add('dialog-open');
});

$('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogTrigger?.focus({ preventScroll: true });
});
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
$('#dialog-contact').addEventListener('click', () => {
  $('#interest').value = activeProduct.id;
  dialog.close();
});
$('#product-contact').addEventListener('click', () => { $('#interest').value = activeProduct.id; });

const menuButton = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
$$('.navigation a, .header-inner > .nav-contact').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });

if (contactEnabled) {
  $('#contact-channel-title').textContent = `Converse com ${siteConfig.salesContactName} pelo WhatsApp`;
  $('#contact-channel-text').textContent = 'Informações sobre produtos, aplicações e cotação.';
  $('#contact-submit-label').textContent = 'Preparar mensagem para o WhatsApp';
  $('#form-privacy').textContent = 'Você revisa o resumo antes de abrir o WhatsApp. Nenhum dado é enviado por este formulário.';
  const floating = $('#floating-contact');
  floating.href = `https://wa.me/${siteConfig.whatsappNumber}`;
  floating.target = '_blank';
  floating.rel = 'noopener noreferrer';
  floating.setAttribute('aria-label', `Conversar com ${siteConfig.salesContactName} pelo WhatsApp`);
  floating.querySelector('span').textContent = 'Fale pelo WhatsApp';
  $('.faq-list details:last-child p').textContent = 'Tenha em mãos o produto de interesse, a cidade, o ambiente da obra e as características do revestimento. Monte seu resumo na área de atendimento e abra a conversa com Daniele pelo WhatsApp.';
}

$('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const product = productById($('#interest').value);
  const message = createProjectSummary({
    productName: product ? `${product.name} — 20 kg` : 'Preciso de orientação para escolher',
    city: $('#city').value,
    area: $('#area').value,
    description: $('#project-description').value,
  }, siteConfig.salesContactName);
  const summary = $('#summary-result');
  $('#message-summary').value = message;
  summary.hidden = false;
  $('#summary-feedback').textContent = contactEnabled ? 'Revise as informações e abra a conversa. O envio é feito por você, no WhatsApp.' : 'Copie este resumo para usar na sua conversa quando o atendimento estiver disponível.';
  if (contactEnabled) {
    let send = $('#send-whatsapp');
    if (!send) {
      send = document.createElement('a');
      send.id = 'send-whatsapp';
      send.className = 'button button-dark';
      send.textContent = 'Abrir conversa no WhatsApp';
      send.target = '_blank';
      send.rel = 'noopener noreferrer';
      summary.append(send);
    }
    send.href = whatsAppUrl(siteConfig.whatsappNumber, message);
  }
  $('#message-summary').focus({ preventScroll: true });
  summary.scrollIntoView({ behavior: motionReduced ? 'auto' : 'smooth', block: 'nearest' });
});

$('#copy-summary').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('#message-summary').value);
    $('#summary-feedback').textContent = 'Resumo copiado. Você pode colar na sua conversa.';
  } catch {
    $('#message-summary').focus();
    $('#message-summary').select();
    $('#summary-feedback').textContent = 'Selecione e copie o texto acima para levar à sua conversa.';
  }
});

$('#year').textContent = String(new Date().getFullYear());
const initialProduct = new URL(window.location.href).searchParams.get('produto');
if (productById(initialProduct)) selectProduct(initialProduct, { query: false });

if ('IntersectionObserver' in window) {
  if (!motionReduced) {
    document.documentElement.classList.add('js-motion');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    $$('.reveal').forEach((element) => revealObserver.observe(element));
  }
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $$('.navigation a, .header-inner > .nav-contact').forEach((link) => {
          const current = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-current', current);
          if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-90px 0px -50% 0px', threshold: 0.05 });
  $$('main section[id]').forEach((section) => navObserver.observe(section));
}
