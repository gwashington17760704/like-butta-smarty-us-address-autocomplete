((global) => {
    let settings = {
        embeddedKey: '',
        addressId: 'address',
        cityId: 'city',
        stateId: 'state',
        zipCodeId: 'zip',
        styleBackgroundColorHexString: '#fff',
        styleColorHexString: '#333',
        styleHoverBackgroundColorHexString: '#ddd',
        styleHoverColorHexString: '#000',
        styleBorderColorHexString: '#e0e0e0',
        styleBorderPixelWidthInt: 2,
        styleFontFamilyString: 'sans-serif',
        styleFontSizePixelInt: 14,
        styleRowPaddingString: '8px',
        styleBoxPixelWidthInt: 300,
        styleBoxPixelHeightInt: 300,
        suggestionElement: document.createElement('div'),
        suggestionId: null,
        offsetHeight: 20,
        addressElement: null,
        activeStyles: "",
        inactiveStyles: 'display: none;',
    };

    const wrapperStyles = `
        display: inline-block; 
        position: relative;
    `;
    
    const extendSettings = (defaults, options) => {
        // @todo ensure the options are allowed.
        return {...defaults, ...options};
    };

    const wrapElementsWithDiv = (elementId) => {
        const knownElement = document.getElementById(elementId);

        if (!knownElement) {
            console.error(`Element with ID ${elementId} not found.`);
            return;
        }

        settings.addressElement = knownElement;
        settings.offsetHeight = knownElement.offsetHeight;

        const wrapperDiv = document.createElement('div');

        wrapperDiv.style.cssText = wrapperStyles;

        knownElement.parentNode.insertBefore(wrapperDiv, knownElement);

        wrapperDiv.appendChild(knownElement);

        knownElement.parentNode.insertBefore(settings.suggestionElement, knownElement.nextSibling);
    }

    const sendLookupRequest = async (searchValue, selected = "") => {
        const params = new URLSearchParams({
            key: settings.embeddedKey,
            search: searchValue,
            source: "all",
            selected
        });
      
        const request = await fetch(
            `https://us-autocomplete-pro.api.smarty.com/lookup?${params}`
        );
        const data = await request.json();
      
        if (data?.suggestions?.length > 0) formatSuggestions(data.suggestions);
    };

    const applyStyles = (element, styles) => {
        for (let property in styles) {
            element.style[property] = styles[property];
        }
    };

    const formatSuggestions = (suggestions) => {
        const {
            suggestionElement, 
            inactiveStyles, 
            styleRowPaddingString,
            styleHoverBackgroundColorHexString,
            styleHoverColorHexString,
            styleBackgroundColorHexString,
            styleColorHexString,
            styleFontSizePixelInt
        } = settings;

        const formattedSuggestions = suggestions.map((suggestion) => {
            const divElement = document.createElement("div");

            divElement.classList.add('smarty-suggestion');

            divElement.style['padding'] = styleRowPaddingString;
            divElement.style['fontSize'] = `${styleFontSizePixelInt}px`;

            const {
                street_line,
                city,
                state,
                zipcode,
                secondary,
                entries
            } = suggestion;
            const hasSecondaryData = secondary && entries > 1;
        
            divElement.innerText = `${street_line} ${secondary} ${
                hasSecondaryData ? `(${entries} entries)` : ""
            } ${city} ${state} ${zipcode}`;

            divElement.addEventListener('mouseover', () => {
                applyStyles(divElement, {
                    backgroundColor: styleHoverBackgroundColorHexString,
                    color: styleHoverColorHexString,
                });
            });

            divElement.addEventListener('mouseout', () => {
                applyStyles(divElement, {
                    backgroundColor: styleBackgroundColorHexString,
                    color: styleColorHexString,
                });
            });
        
            divElement.addEventListener("click", async () => {
                const streetLineWithSecondary = `${street_line} ${secondary}`.trim();
                if (hasSecondaryData) {
                    suggestionElement.innerHTML = "";
                    const selected = `${streetLineWithSecondary} (${entries}) ${city} ${state} ${zipcode}`;
                    await sendLookupRequest(streetLineWithSecondary, selected);
                } else {
                    suggestionElement.style.cssText = inactiveStyles;
                }
                populateForm({ streetLineWithSecondary, city, state, zipcode });
            });
        
            return divElement;
        });
        
        suggestionElement.append(...formattedSuggestions);
    }

    const populateForm = ({ streetLineWithSecondary, city, state, zipcode }) => {
        const {addressId, cityId, stateId, zipCodeId} = settings;

        document.getElementById(addressId).value = streetLineWithSecondary;
        document.getElementById(cityId).value = city;
        document.getElementById(stateId).value = state;
        document.getElementById(zipCodeId).value = zipcode;
    };

    SmartyUsAddressAutocomplete = (userSettings) => {
        settings = extendSettings(settings, userSettings);

        wrapElementsWithDiv(settings.addressId);

        settings.activeStyles = `
            display: block;
            position: absolute; 
            overflow-y: auto; 
            cursor: pointer;
            top: ${settings.offsetHeight}; 
            width: ${settings.styleBoxPixelWidthInt}px; 
            height: ${settings.styleBoxPixelHeightInt}px; 
            border: solid ${settings.styleBorderPixelWidthInt}px ${settings.styleBorderColorHexString}; 
            background-color: ${settings.styleBackgroundColorHexString};
            font-family: ${settings.styleFontFamilyString};
            color: ${settings.styleColorHexString};
        `;
        settings.suggestionElement.id = 'smartySuggestionBox';
        settings.suggestionId = settings.suggestionElement.id;
        
        const {addressElement, suggestionElement, inactiveStyles, activeStyles} = settings;

        suggestionElement.style.cssText = inactiveStyles;

        addressElement.addEventListener("keyup", (e) => {
            const searchValue = e.target.value;
            suggestionElement.innerHTML = "";
            if (!searchValue) {
                suggestionElement.style.cssText = inactiveStyles;
                return;
            }
          
            suggestionElement.style.cssText = activeStyles;
          
            sendLookupRequest(searchValue);
        });

        document.addEventListener('click', (e) => {
            if (!suggestionElement.contains(e.target) && !e.target.classList.contains('smarty-suggestion')) {
                suggestionElement.style.cssText = inactiveStyles;
            }
        });
    };

    global.SmartyUsAddressAutocomplete = SmartyUsAddressAutocomplete;

})(window);