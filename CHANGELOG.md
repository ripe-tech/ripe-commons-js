# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

*

### Changed

*

### Fixed

* Fix `eslint-config-hive` transitive dependencies problem for `npm`

## [0.10.1] - 2022-05-23

### Fixed

* Linting support

## [0.10.0] - 2022-05-23

### Added

* Initial support for the `env.js` options retrieval solution

## [0.9.0] - 2022-04-24

### Added

* Extracted CSV functions from `ripe-util-vue` - [ripe-pulse/#302](https://github.com/ripe-tech/ripe-pulse/issues/302)
* Express middleware not found and error handlers - [ripe-orchestra/#16](https://github.com/ripe-tech/ripe-orchestra/issues/16)
* Support for more complex building and parsing of CSV data and files

### Changed

* Refactored the ACL function out of the fastify module to be used by express as well - [ripe-orchestra/#16](https://github.com/ripe-tech/ripe-orchestra/issues/16)

## [0.8.1] - 2022-02-07

### Fixed

* `breakString` bug where an additional empty line was returned if the string **exactly** fit the last line

## [0.8.0] - 2022-02-03

### Added

* Added `mimeType` util function that returns the correct mime type of a given file format

### Changed

* Added more options to the `normalize()` method

## [0.7.2] - 2021-10-13

### Added

* Bumped packages

## [0.7.1] - 2021-10-13

### Added

* Support for custom keywords in `filterToParams`, such as `@recently-updated` or `@recently-rejected`

## [0.7.0] - 2021-09-02

### Added

* Parse query function as `parseSearchParams()`
* `moneyMixin`

## [0.6.0] - 2021-08-02

### Added

* Support for `splitArray` function in the array file

## [0.5.1] - 2021-07-26

### Added

* Support for "smart" line breaking using `breakString()`

## [0.5.0] - 2021-07-06

### Added

* Allow having different filter fields when the match is not perfect (in `filterToParams`)

## [0.4.1] - 2021-06-21

### Added

* Function `encodeBarcode128B` that encodes values to Code 128 set B, to use in barcodes

## [0.4.0] - 2021-06-01

### Added

* Config, context, filter and utils from [ripe-components-vue](https://github.com/ripe-tech/ripe-components-vue)

## [0.3.6] - 2021-05-14

### Added

* `ripeAuth` has token

## [0.3.5] - 2021-04-17

### Added

* `patchBaseUrl` to allow fixing non canonical base URL values

## [0.3.4] - 2021-04-01

### Added

* Exposed `acl` middleware
