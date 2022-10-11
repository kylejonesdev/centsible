<div id="top"></div>

<!-- PROJECT HERO -->

<br />
<div align="center">
<!-- TODO: Find Logo
  <a href="">
    <img src="">
  </a>
 -->
  <h2 align="center">Centsible</h2>

  <p align="center">
    An accounting application built on the idea that small business bookkeeping doesn't have to be scary.
    <br />
    <br />
    <a href="https://centsible.herokuapp.com">View Demo</a>
    ·
    <a href="https://github.com/kylejonesdev/centsible/issues">Report Bug</a>
    ·
    <a href="https://github.com/kylejonesdev/centsible/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
  <h3>Table of Contents</h3>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#help">Help</a>
      <ul>
        <li><a href="#helpful-terminology">Helpful Terminology</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>


<!-- ABOUT THE PROJECT -->
## About The Project

<!-- TODO: Screenshot -->

Centsible exists because people that run their own businesses and people that enjoy accounting don't often overlap. Centsible uses simple language and the minimum points of interaction possible, so you still get to spend your time actually running your business, and your bookkeeper doesn't have a heart attack when you hand them a shoebox of crumpled receipts at the end of the year.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- BUILT WITH -->
### Built With

This application is built entirely using HTML, CSS, and JavaScript. Frameworks and technologies utilized include:

* [Node](https://www.nodejs.org)
* [Express](https://www.expressjs.com)
* [MongoDB](https://www.mongodb.com) - NoSQL database
* [EJS](https://ejs.co) - view templating
* [MongoDB Atlas](https://ejs.co) - cloud database service
* [Cloudinary](https://cloudinary.com) - cloud image hosting
* [Tailwind](https://www.tailwindcss.com) - styling
* [DaisyUI](https://www.daisyui.com) - styling
* [Heroku](https://www.heroku.com) - application hosting


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- FEATURES -->
## Features

- Track income and expense by payee and account
- Add documentation directly to transactions, so supporting documents are available at a glance
- Utilizes controls so transactions can only be added to existing payees and accounts
- Sorts, filters, and groups galore: sort ascending or descending by multiple fields, filter by date, group by payee or account
- Includes a dashboard to quickly view financial status at a glance.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- HELP -->
## Help

1. To get started, create an account on the [Centsible](https://centsible.herokuapp.com) website.
2. Once you login, you will be greeted by the "Dashboard" page.
3. In the navigation menu, click "Transactions", then create a new example transaction.
    - To do this, in the "Add a Transaction" form, select a date, payee, amount, and whether the transaction is income or expense.
    - The "Payee" and "Account" fields will be prepopulated by a few examples you can use. Pick from those.
    - Documentation and description are optional.
    - When you have completed the "Add a Transaction" fields, click the yellow "Add Transaction" button.
4. You now have your first transaction. To see details about it, in the "Transactions" table below the "Add a Transaction" form you just used, click the info button on the far right of the transaction's table row.
5. Now try adding your own entities and accounts through their respective buttons on the navigation bar at the top of the screen, or by using the blue "plus" icons next to Payee and Account on the "Add a Transaction" form from Step 3.
6. Once you have a few transactions entered, check out the dashboard to see your financial status at a glance.


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- HELPFUL TERMINOLOGY -->
### Helpful Terminology

- Transaction - a financial activity of the user either receiving money (income) or giving money (expense).
- Payee - the party to a transaction that is not the user. Payees can be selected from the list of Entities.
- Account - the category to which a transaction relates. Answers the question "What was this for?".
- Type - the type of transaction, income or expense.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Basic CRUD functionality
- [x] Authentication
- [x] Entity and account controls
- [x] Attachments
- [x] Transaction sorting, filtering, and grouping
- [x] Dashboard for high-level analysis
- [ ] Transaction export
- [ ] Allow selection of bank account corresponding to transaction
- [ ] Dashboard enhancement to show graphs, quick interactions, back-to-top button.
- [ ] Ability to take payments


See the [open issues](https://github.com/kylejonesdev/centsible/issues) for a full list of proposed features (and known issues).


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Do you love programming and accounting? I'd **really appreciate** your contributions.

If you have a suggestion that would improve this project, please add an issue on the issues page of this repo or fork this repo and create a pull request.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GPL License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kyle Jones - [@kylejonesdev](https://twitter.com/kylejonesdev) - [kylejones.dev](https://www.kylejones.dev/contact)

Project Link: [https://github.com/kylejonesdev/centsible](https://github.com/kylejonesdev/centsible)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Here are just a few of the folks whose hard work I really appreciate:

* [othneildrew Readme Template](https://github.com/othneildrew/Best-README-Template)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/