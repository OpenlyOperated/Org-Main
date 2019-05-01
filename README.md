# Main - OpenlyOperated.org Site

This is the Node.js Express server that hosts the OpenlyOperated.org site, which is itself Openly Operated. It accepts email newsletter signups, and also displays pages stored in OpenlyOperated.org's Content Management System.

## View Pages

### View Page With Alias
__Request__

```
GET /post/[alias]?footer=true
```
or

```
GET /report/[alias]?footer=true
```

Name | Type | Description
--- | --- | ---
`alias` | `string` | __Required__ The URI alias for a page created by the `Admin` CMS. Must be only alphanumeric, dashes, and underscores.
`footer` | `boolean` | Whether or not to show the footer that includes additional explanations, links, etc. Defaults to `true`.

__Response__

Looks up the page using `alias` and displays it.

### Home Page
__Request__

```
GET /
```

__Response__

Shows the first post tagged "home".

### Reports
__Request__

```
GET /reports
```

__Response__

Shows a list of pages tagged "audit report".

### About Us
__Request__

```
GET /about-us
```

__Response__

Shows the first post tagged "about us".

### User Benefits
__Request__

```
GET /user-benefits
```

__Response__

Shows the first post tagged "user benefits".

### For Companies
__Request__

```
GET /for-companies
```

__Response__

Shows the first post tagged "for companies".

### How To
__Request__

```
GET /how-to
```

__Response__

Shows the first post tagged "how to".

### FAQ
__Request__

```
GET /faq
```

__Response__

Shows all posts tagged "faq", with a table of contents on top.

### Auditors
__Request__

```
GET /auditors
```

__Response__

Shows the first post tagged "auditors".

### Auditors
__Request__

```
GET /contact
```

__Response__

Shows the first post tagged "contact".

### Blog
__Request__

```
GET /blog
```

__Response__

Shows posts tagged "blog".


### Privacy Policy
__Request__

```
GET /privacy-policy
```

__Response__

Shows posts tagged "privacy policy".


### Terms
__Request__

```
GET /terms
```

__Response__

Shows posts tagged "terms".


## Newsletter Signup

### Subscribe to Newsletter
__Request__

```
POST /newsletter-subscribe
```

Name | Type | Description
--- | --- | ---
`email` | `string` | __Required__ Email to subscribe to the newsletter.

__Response__

```
{
	message: "Successfully subscribed",
	code: 0
}
```

### Confirm Newsletter Subscription
__Request__

```
GET /newsletter-confirm
```

Name | Type | Description
--- | --- | ---
`email` | `string` | __Required__ Email to confirm subscription for.
`code` | `string` | __Required__ Code that confirms a user is the owner of an email address to complete email signup.

__Response__

Redirects to home page `/` with "Newsletter subscription confirmed." success message.


### "Do Not Email" Newsletter - Web
__Request__

```
GET /newsletter-do-not-email
```

Name | Type | Description
--- | --- | ---
`email` | `string` | __Required__ Email to cancel newsletter subscription for.
`code` | `string` | __Required__ Code that confirms a user is the owner of an email address to cancel newsletter subscription.

__Response__

Shows the "Do Not Email" webpage to confirm the user wishes to never receive emails again.

### "Do Not Email" Newsletter
__Request__

```
POST /newsletter-do-not-email
```

Name | Type | Description
--- | --- | ---
`email` | `string` | __Required__ Email to cancel newsletter subscription for.
`code` | `string` | __Required__ Code that confirms a user is the owner of an email address to cancel newsletter subscription.
`reason` | `string` | Reason they want to unsubscribe from the email newsletter.

__Response__

Redirects to the home page `/` with "You have been removed from the Openly Operated newsletter." success message.

## Other APIs

### Test Error
__Request__

```
GET /error-test
```

### Health Check
__Request__

```
GET /health
```

__Response__

```
Status 200
{
	message: "OK"
}
```

## License

This project is licensed under the GPL License - see the [LICENSE.md](LICENSE.md) file for details

## Contact

<engineering@openlyoperated.org>