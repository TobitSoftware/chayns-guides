# Intercom Frontend
This is the frontend project for the new Intercom tapp.

## BB-Codes
When sending a message you can add different BB-Codes to the text to display HTML elements inside the message.

#### Format text
There are some BB-Codes to format the text for the message. All codes are replaced by their corresponding HTML codes.
You can see the supported codes and their effect in the table below:

| **Code**                  | **HTML code**                 | **Effect**    |
| ------------------------- | ----------------------------- | ------------- |
| [b]Intercom[/b]           | \<b>Intercom\</b>             | bold          |
| [i]Intercom[/i]           | \<i>Intercom\</i>             | italic        |
| [u]Intercom[/u]           | \<u>Intercom\</u>             | underline     |
| [s]Intercom[/s]           | \<s>Intercom\</s>             | strikethrough |
| [center]Intercom[/center] | \<center>Intercom\</center>   | center        |

#### HTML elements
There are also some BB-Codes to handle some HTML elements in the message text. You must use the BB-Codes instead of
HTML tags because the HTML tags will be ignored because of script injection.   
The following codes are supported

| **Code**          | **HTML code**         | **Element**   |
| ----------------- | --------------------- | ------------- |
| [h1]Intercom[/h1] | \<h1>Intercom\</h1>   | Headline 1    |
| [h2]Intercom[/h2] | \<h2>Intercom\</h2>   | Headline 2    |
| [h3]Intercom[/h3] | \<h3>Intercom\</h3>   | Headline 3    |
| [p]Intercom[/p]   | \<p>Intercom\</p>     | Paragraph     |

#### Using of BB-Codes
You can use the BB-Codes by writing them into the text of the message. The intercom will check the text for these codes
and replaces them with their corresponding HTML codes.

The codes can be used together to maybe display a bold and underlined text with the following code:   
<code>[b][u]Intercom[/u][/b]</code>

You can also display a centered headline with the following code:   
<code>[center][h1]Intercom[/h1][/center]</code>

#### Button
There is a special BB-Code to add buttons to the intercom message. The using of this button is a bit different to buttons
in normal HTML. Buttons must have the following syntax:

<code>[button \<parameter\>="\<value\>"]\<buttonName\>[/button]</code>

Several parameters can be added to a button:
- inline: If value is true the button will be displayed inline *(optional)*
- url: The url to open *(optional, but used as fallback for tappId)*
- urlParameters: The urls parameters will be added to selectTapp call and openUrl (in url notation without leading "?" or "&") *(optional)*
- tappId: TappId of tapp to open *(optional)*
- locationId: LocationId of site to open tapp on *(optional)*
- buttonName: Text which will be displayed on the button

Here is an example:

<code>[button tappId="250359" url="de.tobit.software/id/money" inline="true" urlParameters="test1=true&test2=42"]Your Money[/button]</code>

The button above will select the money tapp in chaynsId and adds the url parameters **test1=true** and **test2=42**.
Also the button will be displayed inline.

> Information: If the locationId parameter is given the tapp will only change if the user is on the correct site. Otherwise the url will be opened.
>
> Warning: When the tappId or locationId not match and there is no url given, nothing will happen on button click.

#### Link
Links can also be added to messages. A link works as same as a button but is displayed as a normal HTML a-Tag.

Links work exactly like buttons but have the following syntax:

<code>[link \<parameter\>="\<value\>"]\<linkName\>[/link]</code>

All parameters given for buttons can be used for links too. 
The inline parameter is not necessary for links because they will be displayed inline every time.

## Parameters
There can be used different url parameters in the intercom to affect it.
The following parameters can be used:

| **Parameter**     | **Effect**                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| isLocation        | show intercom in site mode                                                                        |
| chaynsId          | direct open chat with user by chaynsId (XXX-XXXXX)                                                |
| lid               | direct open chat with site by locationId                                                          |
| tid               | direct open chat by thread id                                                                     |
| forceNew          | opens new thread view and selects member for given chaynsID or LID even when chat already exists  |
| hideBack          | hides the headline bar of intercom and sets thread name as website title                          |

> **Information:** The parameter "LID" will be later replaced with "siteID" to open chat with site by siteID of locations. 

> **Information:** The parameters can be used in url directly or in `chayns.selectTapp()`.

**Examples to open chats:**
````javascript
 // This opens the chat with Jannik Weise or creates new thread view if thread not given
chayns.selectTapp({
	id: 251441,
	params: 'chaynsId=120-21056'
});

// This opens new thread view and preselects Tobit.Software as receiver even if chat with Tobit.Software already exists
chayns.selectTapp({
	id: 251441,
	params: 'lid=1214&forceNew'
});

// This opens the chat for the given thread id
chayns.selectTapp({
	id: 251441,
	params: 'tid=<threadId>' // ToDo: insert threadId here
});
````

## Plugins
In intercom messages there can be displayed plugins. Every plugin must work on itself, because the plugins will be rendered in an iFrame.

#### Parameters
There are different parameters given to the iFrame of the plugin. Here is an short overview:

| **Parameter**     | **Information**                           |
| ----------------- | ----------------------------------------- |
| inGroupChat       | is message displayed in group chat        |
| authorId          | memberId from author of message           |
| messageId         | id of message (identifier)                |
| memberId          | memberId from member who uses intercom    |
| threadId          | threadId of current thread                |
| isWidget          | always "true" to handle postMessage       | 
| customPluginId    | customId which can be set for plugins     |
| fontColor         | color for font (needs to be set)          |
| fontSize          | *(optional)* - needs to be set if given   |
| fontFamily        | *(optional)* - needs to be set if given   |

> The parameters `fontColor`, `fontSize` and `fontFamily` must be set on iFrame's content to correctly displaying the content.
> 
> The other url parameters for chayns are also given.

#### Declare plugin in intercom database
The plugins must be declared in the plugin database from intercom.
To do this you can ask `Lucas Engelke` to set the information into the database.

The following info must be given:
* name
* GET (called later as URL in the iFrame)
* POST (optional: Called from the intercom endpoint to save data in database of plugin)

#### Create plugin messages
Plugin messages can be created with the following endpoint:

`POST` https://sub54.tobit.com/rest/api/thread/\<threadID\>/plugin

The following body must be given for the request:

* message
    * text: (string)
    * typeId: (int) (9 - Type for plugin messages | 11 - Type for system plugin messages)
    * pluginData: (object) (not needed if no POST endpoint for plugin is set in database)
    * pluginId: (int)
    * customPluginId: (string - max 36 Letters) custom id for plugin given in URL parameters
* author
    * locationId / tobitId: (int) (locationId or userId from author of message)
    
#### Get threadId
To get the thread id you can just call the following endpoint from the intercom

`POST`  https://sub54.tobit.com/rest/api/thread

The documentation for this endpoint can be seen at the following link:
https://wiki.tobit.com/doku.php?id=produkte:chayns:chat:rest_api:thread

#### Handling of plugins in intercom
In the intercom there will be displayed an waitcursor while the plugin is loaded.
The waitcursor will be removed when the plugin calls an postMessage event to the intercom frame.

In the postMessage the size of the plugin must be given, so the intercom can make the message bubble 
smaller or bigger.

To do this just use the following code snippet:

```javascript
function postIframeSizeToParentWindow(wrapperDiv) {
    const height = wrapperDiv.clientHeight;
    const width = wrapperDiv.clientWidth;

    //add 1 to values because of rounding of values
    const sizeData = {
        width: width + 1,
        height: height + 1,
        windowName: window.name
    };

    window.parent.postMessage(JSON.stringify(sizeData), '*');
}
```

> Then you just need to call the function with your root DOM element as parameter :\)
