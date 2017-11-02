/**
 * Created by groupsky on 01.11.17.
 */

exports.ENDPOINT = 'http://www.horntracker.com/backend/new/api.php'

exports.aliases = {
  // type aliases
  rank: 'title',
  charm: 'trinket',
  journal: 'journal type',
  // title aliases
  lord: 'lord/lady',
  lady: 'lord/lady',
  baron: 'baron/baroness',
  baroness: 'baron/baroness',
  count: 'count/countess',
  countess: 'count/countess',
  duke: 'duke/duchess',
  duchess: 'duke/duchess',
  'grand duke': 'grand duke/duchess',
  'grand duchess': 'grand duke/duchess',
  archduke: 'archduke/archduchess',
  archduchess: 'archduke/archduchess',
  // journal type aliases
  'trap check': 'trap checks',
  'check': 'trap checks',
  'checks': 'trap checks',
  friend: 'friend sounded'
}

exports.cached = {
  shield: {
    active: 1,
    inactive: 0
  },
  'journal type': {
    active: 1,
    'trap checks': 2,
    'friend sounded': 3
  },
  season: {
    fall: 1,
    spring: 3,
    summer: 4,
    winter: 2
  },
  'hallway length': {
    short: 2,
    medium: 1,
    long: 3,
    none: 4
  },
  'hallway tier': {
    plain: 1,
    superior: 2,
    epic: 3,
    none: 4
  },
  'hallway type': {
    fealty: 5,
    tech: 4,
    scholar: 1,
    treasury: 2,
    farming: 3,
    entrance: 6,
    minotaur: 7
  },
  'grove status': {
    open: 0,
    closed: 1
  },
  tide: {
    high: 3,
    low: 1,
    medium: 2
  },
  'iceberg section': {
    'treacherous tunnels': 1,
    'brutal bulwark': 2,
    'bombing run': 4,
    'the mad depths': 5,
    'icewing\'s lair': 6,
    'general (#1)': 7,
    'general (#2)': 8,
    'general (#3)': 9,
    'general (#4)': 10,
    'hidden depths': 12,
    'the deep lair': 13
  }
}
