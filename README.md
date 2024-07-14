# "Like Butta" 🧈 Smarty US Address Autocomplete 🇺🇸

This solution lets you painlessly drop a few lines of JavaScript into your code to give you Smarty's US Address Autocomplete. There are zero external dependencies. It should play nice with all frameworks and libraries. If your form uses, or can use `id` HTML attributes for your address, city, state, and ZIP Code fields, this should work for you. 

If your HTML looks something like this...

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

...then all you need to get up and running is to place the JavaScript code below just before your closing `</body>` tag:

```javascript
<script src="https://cdn.jsdelivr.net/gh/gwashington17760704/like-butta-smarty-us-address-autocomplete/src/like-butta-smarty-us-address-autocomplete.js"></script>
<script>
  LikeButtaSmartyUsAddressAutocomplete({
    embeddedKey: 'YOUR SMARTY EMBEDDED KEY GOES HERE',
    addressId: 'myCoolAddress',
    cityId: 'myCoolCity',
    stateId: 'myCoolState',
    zipCodeId: 'myCoolZip',
  });
</script>
```

Check this out. Notice how the `id` attributes are mapped into the JavaScript function? Yep, that's right: `myCoolAddress` maps to the `addressId` object property.  `myCoolCity` maps to `cityId` and so on.

What about custom styling? That's available too. See the [Props](#props) section below. 

Make sure you get a [Smarty](https://www.smarty.com) account and an Embedded Key pointed at your domain.

Hopefully this is truly, like butta for you 🧈. Cheers!

## Installation and Example Usage
This is the easy part. Just copy these lines of JavaScript code below and paste it just above the closing `</body>` tag:

```javascript
<script src="https://cdn.jsdelivr.net/gh/gwashington17760704/like-butta-smarty-us-address-autocomplete/src/like-butta-smarty-us-address-autocomplete.js"></script>
<script>
  LikeButtaSmartyUsAddressAutocomplete({
    embeddedKey: 'YOUR SMARTY EMBEDDED KEY GOES HERE',
    addressId: 'myCoolAddress',
    cityId: 'myCoolCity',
    stateId: 'myCoolState',
    zipCodeId: 'myCoolZip',
  });
</script>
```

Modify the properties inside the function argument object as needed to match up with your address inputs. The above example is pretty minimal. Basically if your HTML has the following code...

```html
<form method="post" action="/save-shipping-address">
    <input id="mySuperAmazingAddressId" type="text" />
    <input id="mySuperAmazingCityId" type="text" />
    <select id="mySuperAmazingStateId">
        <option value="FL">FL</option>
        <option value="CA">CA</option>
        <option value="NY">NY</option>
    </select>
    <input id="mySuperAmazingZipCodeId" type="text" />
    <button>Submit</button>
</form>
```

...then you'll modify your JavaScript to look like this:

```javascript
<script src="https://cdn.jsdelivr.net/gh/gwashington17760704/like-butta-smarty-us-address-autocomplete/src/like-butta-smarty-us-address-autocomplete.js"></script>
<script>
  LikeButtaSmartyUsAddressAutocomplete({
    embeddedKey: 'YOUR SMARTY EMBEDDED KEY GOES HERE',
    addressId: 'mySuperAmazingAddressId',
    cityId: 'mySuperAmazingCityId',
    stateId: 'mySuperAmazingStateId',
    zipCodeId: 'mySuperAmazingZipCodeId',
  });
</script>
```

Reminder: This JavaScript code goes at the bottom of your HTML file just above the closing `</body>` tag.

Be sure to go to [www.smarty.com](https://www.smarty.com) to create your account and setup your Embedded Key. Once you've setup your Embedded Key, copy it and paste it in place of the 'YOUR SMARTY EMBEDDED KEY GOES HERE' string.

See the `/examples/example-minimal.html` file to see a working example.

## Props

If you want to alter the colors and styling a bit you can include some additional properties to the single argument object that is passed into the `SmartyUSAddressAutocomplete()` function. Change these properties to suit your configuration and styling needs. Here's a description of each property.

* `embeddedKey`
    * Description: This is a string containing your Smarty embedded key.
    * Default: Empty string.

* `addressId`
    * Description: This is a string containing the id of your street address field.
    * Default: Empty string.

* `cityId`
    * Description: This is a string containing the id of your city field.
    * Default: Empty string.
 
* `stateId`
    * Description: This is a string containing the id of your state field.
    * Default: Empty string.

* `zipCodeId`
    * Description: This is a string containing the id of your zip code field.
    * Default: Empty string.

* `styleBackgroundColorHexString`
    * Description: This is the background color (in a hex string) where the address suggestions will be displayed.
    * Default: String '#fff'.

* `styleColorHexString`
    * Description: This is the foreground color (in a hex string) for the address suggestions that will be displayed.
    * Default: String '#333'.

* `styleHoverBackgroundColorHexString`
    * Description: This is the background color (in a hex string) of the address suggestion row that is hovered over.
    * Default: String '#cfe8ff'.

* `styleHoverColorHexString`
    * Description: This is the foreground color (in a hex string) for the address suggestion text in the row that is hovered over.
    * Default: String '#000'.
 
* `styleBorderColorHexString`
    * Description: This is the border color (in a hex string) for the container holding the address suggestions.
    * Default: String '#e0e0e0'.

* `styleBorderPixelWidthInt`
    * Description: This is the border width (as an integer) for the pixel width for the container holding the address suggestions.
    * Default: Integer 2.
  
* `styleBorderRadiusInt`
    * Description: This is the border radius (as an integer) in pixels for the container holding the address suggestions.
    * Default: Integer 8.
 
* `styleFontFamilyString`
    * Description: This is the font family string for the container holding the address suggestions.
    * Default: String 'sans-serif'.
 
* `styleFontSizePixelInt`
    * Description: This is the font size (as an integer) in pixels for the address suggestions.
    * Default: Integer 14.

* `styleRowPaddingString`
    * Description: This is the padding string for each row containing an address suggestion.
    * Default: String '8px'.
 
* `styleBoxPixelWidthInt`
    * Description: This is the width (as an integer) in pixels for the container holding the address suggestions.
    * Default: Integer 300.

* `styleBoxPixelHeightInt`
    * Description: This is the height (as an integer) in pixels for the container holding the address suggestions.
    * Default: Integer 300.

* `styleSelectedSuggestionColorHexString`
    * Description: This is the foreground text color of the selected address suggestion row when used with up and down arrow navigation.
    * Default: String '#000'.

* `styleSelectedSuggestionBackgroundColorHexString`
    * Description: This is the background color of the selected address suggestion row when used with up and down arrow navigation.
    * Default: String '#ddd'.
