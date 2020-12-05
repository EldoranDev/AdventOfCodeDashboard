# AdventOfCode Dashboard

> Advent of Code Visualized

background details relevant to understanding what this module does

## Usage

```bash
# bulding
AOC_YEAR=2020 AOC_SESSION=8asda.... AOC_BOARD=1 npm run build

# development
AOC_CACHED=true AOC_YEAR=2020 AOC_SESSION=8asda.... AOC_BOARD=1 npm run build
```

## Configuration
| Config | Default | Description
| --- | :---: | --: |
| AOC_CACHED | Not set |If set a cached version of the leaderbord will be used |
| AOC_YEAR | Current Year | Sets the year that should be used
| AOC_BOARD | Not set | The ID of the private Leaderboard to visualize
| AOC_SESSION | Not set | Active session id to access the AoC API
| AOC_INCLUDE | [] | Comma seperated list of which users to not anonymise
| AOC_INCLUDE_ALL | false | If everyone on the board should be included with name. Always false if AOC_INCLUDE is set. 


## See Also

- [AdventOfCode](https://adventofcode.com)
- [Gridsome](https://gridsome.org)

## License

MIT

