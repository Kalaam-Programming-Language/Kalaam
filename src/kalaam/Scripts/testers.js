function isInterpretableType(t) {
    let non_types = ['variable', 'Array', 'close_bracket', 'open_bracket', 'value',];

    if (non_types.includes(t)) {
        return false;
    } else {
        return true;
    }
}

export { isInterpretableType, };
