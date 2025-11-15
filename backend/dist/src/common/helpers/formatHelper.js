"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.truncate = truncate;
exports.formatNumber = formatNumber;
exports.renderBadge = renderBadge;
exports.imageUrl = imageUrl;
function formatDate(input, locale = 'en-US', options) {
    if (!input)
        return '';
    const date = input instanceof Date ? input : new Date(input);
    try {
        return new Intl.DateTimeFormat(locale, options || { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
    }
    catch {
        return date.toLocaleString();
    }
}
function truncate(text, length = 140, suffix = '…') {
    if (!text)
        return '';
    const s = String(text);
    if (s.length <= length)
        return s;
    return s.slice(0, length).trimEnd() + suffix;
}
function formatNumber(value, locale = 'en-US', options) {
    if (value === undefined || value === null || value === '')
        return '';
    const num = typeof value === 'number'
        ? value
        : Number(String(value).replace(/[^0-9.-]+/g, ''));
    if (Number.isNaN(num))
        return String(value);
    return new Intl.NumberFormat(locale, options || {}).format(num);
}
function renderBadge(status, label) {
    const s = (status || '').toLowerCase();
    const text = label || status || '';
    let color = '#6b7280';
    if (s === 'active' || s === 'online' || s === 'published')
        color = '#16a34a';
    else if (s === 'draft' || s === 'inactive')
        color = '#f59e0b';
    else if (s === 'error' || s === 'failed')
        color = '#dc2626';
    return `<span class="helper-badge" style="display:inline-block;padding:0.18rem 0.5rem;border-radius:999px;background:${color};color:#fff;font-size:0.8rem;font-weight:600;">${escapeHtml(text)}</span>`;
}
function imageUrl(path) {
    if (!path)
        return '';
    if (/^(https?:)?\/\//.test(path) || path.startsWith('/'))
        return path;
    return '/' + path.replace(/^\/+/, '');
}
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
//# sourceMappingURL=formatHelper.js.map