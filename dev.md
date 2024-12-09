# Install the NativeScript CLI
npm install -g nativescript

# This should get your project up-to-date with the latest dependencies
ns migrate

# Create a new NativeScript project with the Vue.js template
tns create my-vue-app --template nativescript-vue-template

# Documentation
https://nativescript-vue.org/en/docs/introduction/
https://docs.nativescript.org/guide/cli-basics

# Creating keystore
keytool -genkeypair -v -keystore mi_keystore.jks -alias mi_alias -keyalg RSA -keysize 2048 -validity 36500 -storepass 66766464 -keypass 66766464

# Release
ns build android --release --key-store-path mi_keystore.jks --key-store-password 66766464 --key-store-alias mi_alias --key-store-alias-password 66766464 --apk --copy-to dist/build.apk
