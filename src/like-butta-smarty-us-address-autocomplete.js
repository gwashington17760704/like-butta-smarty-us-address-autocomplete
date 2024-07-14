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
        styleBorderRadiusInt: 8,
        styleFontFamilyString: 'sans-serif',
        styleFontSizePixelInt: 14,
        styleRowPaddingString: '8px',
        styleBoxPixelWidthInt: 300,
        styleBoxPixelHeightInt: 300,
        styleSelectedSuggestionColorHexString: '#000',
        styleSelectedSuggestionBackgroundColorHexString: '#ccc',
        suggestionElement: document.createElement('div'),
        suggestionId: null,
        offsetHeight: 20,
        addressElement: null,
        activeStyles: "",
        inactiveStyles: 'display: none;',
        selectedIndex: 0,
        lastAction: "",
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
      
        try {
            const request = await fetch(
                `https://us-autocomplete-pro.api.smarty.com/lookup?${params}`
            );
            const data = await request.json();
          
            if (data?.suggestions?.length > 0) formatSuggestions(data.suggestions);
        } catch(e) {
            console.error(e.message);
        }
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
            styleFontSizePixelInt,
            styleSelectedSuggestionColorHexString,
            styleSelectedSuggestionBackgroundColorHexString,
            activeStyles,
        } = settings;

        suggestionElement.innerHTML = '';
        suggestionElement.style.cssText = activeStyles;

        const formattedSuggestions = suggestions.map((suggestion, index) => {
            const divElement = document.createElement("div");

            divElement.classList.add('smarty-suggestion');

            divElement.style['padding'] = styleRowPaddingString;
            divElement.style['fontSize'] = `${styleFontSizePixelInt}px`;

            if (index === 0) {
                applyStyles(divElement, {
                    color: styleSelectedSuggestionColorHexString,
                    backgroundColor: styleSelectedSuggestionBackgroundColorHexString,
                });
                settings.selectedIndex = 0;
            }

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
                if (settings.lastAction === 'keyboard') return;
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

    const scrollWrapperToSelected = () => {
        const {selectedIndex, suggestionElement} = settings;
        const elements = document.getElementsByClassName('smarty-suggestion');
        if (selectedIndex >= 0 && selectedIndex < elements.length) {
            const selectedChild = elements[selectedIndex];
            const wrapperRect = suggestionElement.getBoundingClientRect();
            const selectedRect = selectedChild.getBoundingClientRect();
    
            // Check if selected child is above the viewport
            if (selectedRect.top < wrapperRect.top) {
                suggestionElement.scrollTop -= (wrapperRect.top - selectedRect.top);
            }
            // Check if selected child is below the viewport
            else if (selectedRect.bottom > wrapperRect.bottom) {
                suggestionElement.scrollTop += (selectedRect.bottom - wrapperRect.bottom);
            }
        }
    }

    LikeButtaSmartyUsAddressAutocomplete = (userSettings) => {
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
            border-radius: ${settings.styleBorderRadiusInt}px; 
            background-color: ${settings.styleBackgroundColorHexString};
            font-family: ${settings.styleFontFamilyString};
            color: ${settings.styleColorHexString};
        `;
        settings.suggestionElement.id = 'smartySuggestionBox';
        settings.suggestionId = settings.suggestionElement.id;
        
        const {addressElement, suggestionElement, inactiveStyles, activeStyles} = settings;

        suggestionElement.style.cssText = inactiveStyles;

        addressElement.addEventListener("keyup", (e) => {
            if ([
                'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'ArrowUp', 'ArrowDown', 
                'ArrowLeft', 'ArrowRight', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 
                'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
            ].includes(e.key)) return;            

            if (e.key === 'Enter') {
                const elements = document.getElementsByClassName('smarty-suggestion');
                elements[settings.selectedIndex].click();
                return;
            }

            const searchValue = e.target.value;

            if (!searchValue) {
                suggestionElement.style.cssText = inactiveStyles;
                return;
            }
          
            sendLookupRequest(searchValue);
        });

        addressElement.addEventListener("keydown", async (e) => {
            if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return;

            e.preventDefault();

            const {
                selectedIndex,
                styleColorHexString, 
                styleBackgroundColorHexString, 
                styleSelectedSuggestionColorHexString,
                styleSelectedSuggestionBackgroundColorHexString,
            } = settings;

            const elements = document.getElementsByClassName('smarty-suggestion');

            [...elements].forEach((element) => {
                applyStyles(element, {
                    color: styleColorHexString,
                    backgroundColor: styleBackgroundColorHexString,
                });
            });

            if (elements.length === selectedIndex + 1 && e.key === 'ArrowDown') {
                settings.selectedIndex = 0;
            } else if (selectedIndex === 0 && e.key === 'ArrowUp') {
                settings.selectedIndex = elements.length - 1;
            } else if (e.key === 'ArrowDown') {
                settings.selectedIndex += 1;
            } else {
                settings.selectedIndex -= 1;
            }

            applyStyles(elements[settings.selectedIndex], {
                color: styleSelectedSuggestionColorHexString,
                backgroundColor: styleSelectedSuggestionBackgroundColorHexString,
            });
            
            settings.lastAction = 'keyboard';
            scrollWrapperToSelected();
        });

        suggestionElement.addEventListener('mousemove', (e) => {
            settings.lastAction = 'mouse';
        });

        suggestionElement.addEventListener('mouseover', (e) => {
            if (settings.lastAction === 'keyboard') return;

            const {styleBackgroundColorHexString, styleColorHexString} = settings;
            const elements = document.getElementsByClassName('smarty-suggestion');
            elements.forEach((element) => {
                applyStyles(element, {
                    color: styleColorHexString,
                    backgroundColor: styleBackgroundColorHexString,
                });
            });
        });

        suggestionElement.addEventListener('mouseout', (e) => {
            const elements = document.getElementsByClassName('smarty-suggestion');
            const {selectedIndex, styleSelectedSuggestionColorHexString, styleSelectedSuggestionBackgroundColorHexString} = settings;
            applyStyles(elements[selectedIndex], {
                color: styleSelectedSuggestionColorHexString,
                backgroundColor: styleSelectedSuggestionBackgroundColorHexString,
            });
        });

        document.addEventListener('click', (e) => {
            if (!suggestionElement.contains(e.target) && !e.target.classList.contains('smarty-suggestion')) {
                suggestionElement.style.cssText = inactiveStyles;
            }
        });
    };

    global.LikeButtaSmartyUsAddressAutocomplete = LikeButtaSmartyUsAddressAutocomplete;

})(window);
