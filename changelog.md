# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 0.2.0 - 2017-08-08
### Added
- This changelog file! :tada:

### Changed
- Components now get passed the `bus.emit` function, instead of the
  whole `bus` object to prevent adding `bus.on` listeners directly in components.
- `fig:ready` event is now named `fig ready` for a e s t h e t i c purposes.
- `@event` listeners in components are no longer default prevented.
- `app.opts` is now exposed at `app._opts`

### Removed
- `app._tree` property.

[Unreleased]: https://github.com/nikersify/fig/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/nikersify/fig/compare/v0.1.2...v0.2.0
