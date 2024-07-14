# Go-Anywhere Drop-in Pop-in Smarty US Address Autocomplete

This project lets you drop a few lines of JavaScript into your code to give you Smarty's US Address Autocomplete. There are zero external dependencies. It should play nice with all framesworks and libraries. If your form uses, or can use `id` attributes for your address, city, state, and ZIP Code fields, this should work for you. 

If your HTML looks something like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Cool Web Page</title>
</head>
<body>
    <form method="post" action="/save-address">
        <input id="myCoolAddress" type="text" placeholder="Address">
        <input id="myCoolCity" type="text" placeholder="City">
        <select id="myCoolState">
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            ...
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
        </select>
        <input id="myCoolZip" type="text" placeholder="ZIP Code">
        <button>Submit</button>
    </form>
</body>
</html>
```

Then all you need to do to get up and running is place this code just before your closing `</body>` tag:

```javascript
<script src="https://cdn.jsdelivr.net/gh/gwashington17760704/smarty-us-address-autocomplete/src/smarty-us-address-autocomplete.js"></script>
<script>
  SmartyUsAddressAutocomplete({
    embeddedKey: 'YOUR SMARTY EMBEDDED KEY GOES HERE',
    addressId: 'myCoolAddress',
    cityId: 'myCoolCity',
    stateId: 'myCoolState',
    zipCodeId: 'myCoolZip',
  });
</script>
```

See how the `id` attributes are mapped into the JavaScript function? Yep, that's right: `myCoolAddress` maps to this function's `addressId` object property.  `myCoolCity` maps to `cityId` and so on.

What about custom styling? Yep, that's available too. See the [Props](#props) section below. 

Of course you'll need to get a [Smarty](https://www.smarty.com) account, and you'll need to create an Embedded Key pointed at your domain.

## Installation
It's just one line of code to pull it in from the CDN.  Make sure it's just above the closing `</body>` tag:

```javascript
<script src="https://cdn.jsdelivr.net/gh/gwashington17760704/smarty-us-address-autocomplete/src/smarty-us-address-autocomplete.js"></script>
```

## Usage

The `SmartyUsAddressAutocomplete()` function inside the `<script>` tags takes just one argument -- an object containing all the properties (props) to get it working.

## Example

See the `example-minimal.html` file in the `examples` folder.

## Props

The single argument that is passed into the `SmartyUSAddressAutocomplete()` function is an object with the following properties (props).

```json
{
  embeddedKey: '', // this is a string containing your Smarty embedded key 
  addressId: '', // this is a string containing the id of your street address field
  cityId: '', // this is a string containing the id of your city field
  stateId: '', // this is a string containing the id of your state field
  zipCodeId: '', // this is a string containing the id of your zip code field
  styleBackgroundColorHexString: '#fff', // this is the background color (in a hex string) where the address suggestions will be displayed
  styleColorHexString: '#333', // this is the foreground color (in a hex string) for the address suggestions that will be displayed
  styleHoverBackgroundColorHexString: '#ddd', // this is the background color (in a hex string) of the address suggestion row that is hovered over
  styleHoverColorHexString: '#000', // this is the foreground color (in a hex string) for the address suggestion text in the row that is hovered over
  styleBorderColorHexString: '#e0e0e0', // this is the border color (in a hex string) for the container holding the address suggestions
  styleBorderPixelWidthInt: 2, // this is the border width (as an integer) for the pixel width for the container holding the address suggestions
  styleFontFamilyString: 'sans-serif', // this is the font family string for the container holding the address suggestions
  styleFontSizePixelInt: 14, // this is the font size (as an integer) in pixels for the address suggestions
  styleRowPaddingString: '8px', // this is the padding string for each row containing an address suggestion
  styleBoxPixelWidthInt: 300, // this is the width (as an integer) in pixels for the container holding the address suggestions
  styleBoxPixelHeightInt: 300, // this is the height (as an integer) in pixels for the container holding the address suggestions
  styleSelectedSuggestionColorHexString: '#fff', // this is the foreground text color of the selected address suggestion row when used with up and down arrow navigation
  styleSelectedSuggestionBackgroundColorHexString: '#000', // this is the background color of the selected address suggestion row when used with up and down arrow navigation
};
```

Change these settings to suit your configuration and styling needs.
