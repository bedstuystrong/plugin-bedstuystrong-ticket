# it's our flex plugin

what's a flex plugin? https://www.twilio.com/docs/flex/developer/plugins

you gotta get the [twilio cli and the flex plugin for it](https://www.twilio.com/docs/flex/developer/plugins/cli/install)

## Local development

```
yarn install
twilio flex:plugins:start
```

### Adding new tabs

check out `src/components/CustomCRM.js`

## Deploying

2 steps

```
twilio flex:plugins:deploy
twilio flex:plugins:release
```