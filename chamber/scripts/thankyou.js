const params = new URLSearchParams(window.location.search);

const fields = {
    'out-fname': 'fname',
    'out-lname': 'lname',
    'out-email': 'email',
    'out-phone': 'phone',
    'out-orgname': 'orgname'
};

Object.entries(fields).forEach(([elementId, paramName]) => {
    const el = document.querySelector(`#${elementId}`);
    if (el) {
        el.textContent = params.get(paramName) || 'Not provided';
    }
});

const timestampEl = document.querySelector('#out-timestamp');

if (timestampEl) {
    const raw = params.get('timestamp');

    if (raw) {
        const date = new Date(raw);

        timestampEl.textContent = Number.isNaN(date.getTime())
            ? raw
            : date.toLocaleString(undefined, {
                  dateStyle: 'long',
                  timeStyle: 'short'
              });
    } else {
        timestampEl.textContent = 'Not provided';
    }
}