# Contributing to ES6 App Skeleton

First off, thank you for contributing! All contributions, big or small, are really appreciated.

The following is a set of guidelines for contributing to ES6 App Skeleton, which is hosted at [ES6 App Skeleton](https://github.com/finiteadventures/es6-app-skeleton) on GitHub. These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

#### Table Of Contents

* [Submitting Issues](#submitting-issues)
* [Pull Requests](#pull-requests)
* [Git Commit Messages](#git-commit-messages)
* [ES6 Styleguide](#es6-styleguide)
* [Spec Styleguide](#spec-styleguide)
* [Documentation Styleguide](#documentation-styleguide)

## Submitting Issues

You can create an issue [here](https://github.com/finiteadventures/es6-app-skeleton/issues/new). Before doing so, please read the notes below on submitting issues of different types. For issues of all types, please include as many details as possible in your report.

### Reporting bugs

* Before reporting a bug, please to check the [existing issues](https://github.com/finiteadventures/es6-app-skeleton/issues) to see if the problem that you have been observed has been previously reported.
* Describe the behavior you expected and the actual behaviour you observed.
* Include the browser, browser version, OS, OS version and device where you experienced the problem.
* Include screenshots and / or other supplementary material, whenever relevant and possible; they are very helpful.
* If possible, check the browser's Javascript console and report any errors that may be associated with the problem you have observed.
* If you can, include a unit test (see the [Spec Styleguide](#spec-styleguide) below for details) that shows how the expected behaviour is not occurring. This can be included as part of the issue description, or as a [gist](https://gist.github.com/).

### Other issue types

Feel free to request new features or suggest enhancements to this project.

* Describe your idea thoroughly.
* Let us know why you think this would be a good addition to this project.
* Give examples of other projects where you may have seen something similar, when relevant.
* If you wish, include supporting material: sketches, mockups, design specs etc.


## Pull Requests

* Fully describe the change(s) made by your pull request.
* Link to any related issues or pull requests.
* Include screenshots and / or other supporting material in your pull request, whenever possible.
* Resolve any code conflicts.
* Follow the [ES6](#es6-styleguide), and [SCSS](#scss-styleguide) styleguides (once these exist!).
* Include thorough [Jasmine](http://jasmine.github.io/) unit tests written in Ecmascript 6. See the [Spec Styleguide](#spec-styleguide) below for details.
* Document new code based on the [Documentation Styleguide](#documentation-styleguide) (once this exists!)

## Git Commit Messages

* Use the present tense ("Add feature" not "Added feature" or "Adds feature").
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
* Limit the first line to 72 characters or less.
* Reference issues and pull requests liberally.
* Consider compressing related commits (e.g. multiple commits  relating to a single feature) into a single commit, where suitable.

## ES6 Styleguide

Coming soon!

## SCSS Styleguide

Coming soon!

## Spec Styleguide

* Write informative, well-structured [Jasmine](http://jasmine.github.io/) unit tests.
* Name specs according to the following convention: '*.spec.js'.
* Place specs in a `spec` folder of the feature/module you are working on, if present.
* Feel free to create a `spec` folder when specs for a feature/module, become sufficiently numerous.
* If a method is private method of a class, it does not strictly require unit testing.
* Treat `describe` as a noun or situation (often the name of class or method).
* Treat `it` as a statement about state or how an operation changes state.
* For instructions on how to to run specs, see information on the project's grunt tasks in our [README](https://github.com/finiteadventures/es6-app-skeleton#grunt-tasks).

### Example

Sample code to be tested:

```es6
class Cat {
  constructor (mood) {
    this.mood = mood || 'sleepy';
  }

  make_noise() {
    if(this.mood === 'sleepy'){
      this.purr();
    } else {
      this.miaow();
    }
  }

  miaow() {
    # code for miaowing here
  }

  purr() {
    # code for purring here
  }
}
```

Sample spec:
```es6
describe('Cat', => {
  describe('#make_noise', => {
    describe('when the cat is sleepy', => {
      it('should purr', => {
        # spec here
      });
    describe('when the cat is not sleepy', => {
      it('should miaow', => {
        # spec here
      });
    });
});
```

## Documentation Styleguide

Coming soon!


This project adheres to the [Contributor Covenant 1.2](http://contributor-covenant.org/version/1/2/0). By participating, you are expected to uphold this code. Please report unacceptable behavior to [sarah@sarahquigley.net](mailto:sarah@sarahquigley.net).
