function editElement(ref, match, replacer) {
    // TODO
    const matcher = new RegExp(match, 'g');
    const result = ref.textContent.replace(matcher, replacer);
    ref.textContent = result;
}