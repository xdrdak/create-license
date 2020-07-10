# create-license

Deno util to spit out a license.

Uses whatever was inside https://github.com/github/choosealicense.com/

## Installing

```
deno install -n create-license --unstable --allow-write --allow-net https://raw.githubusercontent.com/xdrdak/create-license/master/cli.ts
```

## Selecting a license from the list

Simply run `create-license` and choose from the list

## Listing available licenses

```
create-license -l
```

## Quickly create a license

```
# Consult the listing of available licenses to know what you can use for license_name
create-license license_name
```
