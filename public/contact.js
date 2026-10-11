export function isValidWhatsAppNumber(value) {
  return typeof value === 'string' && /^\d{10,15}$/.test(value);
}

export function createProjectSummary({ productName, city, area, description }, contactName = 'TEKNOFIX') {
  const lines = [`Olá, ${contactName}! Gostaria de informações e uma cotação da TEKNOFIX.`, '', `Produto: ${productName}`];
  if (city?.trim()) lines.push(`Cidade: ${city.trim()}`);
  if (area?.trim()) lines.push(`Área estimada: ${area.trim()} m²`);
  if (description?.trim()) lines.push('', `Sobre a obra: ${description.trim()}`);
  lines.push('', 'Pode me orientar sobre a aplicação e a disponibilidade?');
  return lines.join('\n');
}

export function whatsAppUrl(number, message) {
  if (!isValidWhatsAppNumber(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
