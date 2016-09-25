'use strict';

/**
 * Abstract representation of a style object that contains and generates per
 * element style specifications that can be overridden or modified.
 */
class Style {
    /**
     * @param {Object} styleProps An object containing style properties. This
     *        follows react's style naming convention.
     */
    constructor(styleProps) {
        if (!styleProps || (styleProps instanceof Array) ||
            typeof styleProps !== 'object') {
            throw new Error('Invalid styleProps specified (arg #1)');
        }
        this._styleProps = Object.assign({}, styleProps);
    }

    /**
     * Returns the properties of the current style.
     */
    get style() {
        return this._styleProps;
    }

    /**
     * Returns a new style object that is contains properties of the current
     * style merged with the specified style or property hash.
     *
     * @param {Object|Style} [overrides={}] An optional object containing
     *        override and/or additional style properties. This could be another
     *        style object.
     *
     * @return {Style} A new style object containing the merged properties.
     */
    merge(overrides) {
        if (overrides instanceof Style) {
            overrides = overrides.style;
        } else if (!overrides || (overrides instanceof Array) ||
            typeof overrides !== 'object') {
            overrides = {};
        }
        return new Style(Object.assign({}, this._styleProps, overrides));
    }
}

export default Style;
