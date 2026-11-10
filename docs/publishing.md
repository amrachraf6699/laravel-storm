# Publishing Laravel Storm

1. Run Composer validation, PHP tests, formatting/static analysis, frontend type/build/browser checks, and the compatibility matrix.
2. Confirm the private technical specification, credentials, `.env`, results, vendor, and node_modules are untracked and absent from archives. Commit compiled `dist/storm.js` and `dist/storm.css`.
3. Push `main`, validate clean installations across the supported Laravel 10–13 versions, then create and push the next annotated release tag once CI passes. Use a release-candidate tag for changes requiring candidate distribution testing. Never move published tags.
4. Sign in to the Packagist account maintaining vendor `amrachraf6699` and open [Submit Package](https://packagist.org/packages/submit).
5. Submit `https://github.com/amrachraf6699/laravel-storm`. Connect GitHub synchronization and check that the latest release tag appears on the package page. If synchronization is missing, use Packagist's account sync or configure its GitHub webhook as described in [official publishing guidance](https://packagist.org/about).
6. In a clean supported Laravel application, run `composer require amrachraf6699/laravel-storm:^0.1 --dev`, then the documented install/doctor/first-run workflow.

Composer metadata intentionally omits `version`; Packagist obtains it from Git tags. Future patches use new tags such as `v0.1.1`, with changelog and compatibility checks. Public API changes before 1.0 should be documented clearly and move the minor version when incompatible.
