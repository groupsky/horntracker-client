# horntracker-client
Unofficial horntracker client using undocumented api

## Cli Usage

The cli provides several commands to extract various data. Most of them require a [setup](#vars) similar to the web ui.

### Population

Population command retrieves the mice population for specific setup. 
Most common use is to request for specific location and cheese

```
ht-cli pop --vars.location.bazar --vars.cheese.gilded
```

### Loot

Query what loot drops have been found given some conditions

```
ht-cli loot --vars.location.laboratory --vars.cheese.brie
```

### Most

Query what is the most used trap/base/cheese/location for some set of filter.

```
ht-cli most trap --vars.location.labyrinth
```

This could be used to find the locations where a particular mouse was most seen 
(this doesn't mean it has the highest attraction at that location, just that is was hunted mostly there)

```
ht-cli most location --vars.mouse.sandmouse
```

### Vars

Vars are the different filters to be applied when executing the command. Most common ones are:

Type | Info | Example
-----|------|--------
Location | Specify the location to limit results | `ht-cli --vars.location.bazaar`
Weapon | Limit to hunts using specific trap | `ht-cli '--vars.weapon.sandstorm Monstrobot'`
Base | Limit by base | `ht-cli --vars.base.minotaur`
Cheese | Limit by cheese. There is support for some common cheese aliases like `sb`, 'msc', etc. | `ht-cli --vars.cheese.sb`
Charm | Limit by charm | `ht-cli --vars.charm.candy`
Mouse | Limit by mouse | `ht-cli --vars.mouse.steel`

Every filter that is available in the web ui, could be specified the same way.

Negating filter (i.e. instead of including records which satisfy the filter, exclude those records) is easy by using `--no-vars` instead of `--var`.


### Output

By default the output is `pretty-json`, which can be changed using the `-o` options to be just `json` or `csv` 


## Integrating in your own tools

The whole functionality is available as a node module, so you can just `require('horntracker-client')` and execute the same queries. 
Result is always a promise resolved with json.

## License

MIT

