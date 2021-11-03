# Ng Generate

* generate a new module 
```ps1
npx ng g module sample --routing=true

npx ng g module products --routing=true; npx ng g component products/main --change-detection=OnPush --export=true --module=products --style=none

```


* generate a new component
```ps1
npx ng g component shared/inventory --change-detection=OnPush --export=true --module=shared  

npx ng g component blog/main --change-detection=OnPush --export=true --module=blog --style=none

```


* generate a new pipe

```ps1
npx ng g pipe sanitizeUrl --export=true --module=shared

```

* generate a new directive
```ps1
npx ng g directive contact/directive/links --module=contact --export=true


npx ng g directive shared/inventory/directive/entryPropertyType --module=shared 
```

# Deploy

* angular build and dpeloy
```ps1
 rm dist;npx ng run AngularApp:judima:githubprod;npx gh-pages -d dist\github
```

# Etc.

* angular check for update
```
rm package-lock.json;npm install -s;npx ng update

npx ng update @angular/core@12.2.8 @angular/cli@12.2.8 @angular/cdk@12.2.8 --allow-
```
