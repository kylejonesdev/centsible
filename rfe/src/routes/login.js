import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
export default function Login() {

  return (
    <>    
      <Header />
      <main class="container mx-auto max-w-md">
        <div class="main-card pb-12 my-8">
          <header class="py-8">
            <div class="flex justify-center items-center pt-8 pb-3">
              <svg id="login-logo" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-accent"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
              <h1 class="hidden sm:inline text-6xl text-accent font-bold pl-2">Centsible</h1>
              <h1 class="sm:hidden text-4xl text-accent font-bold pl-2">Centsible</h1>
            </div>
            <p class="text-primary font-semibold text-center mx-4">Bookkeeping doesn't have to be scary.</p>
          </header>
          <section class="mx-8">
            {/* <% if (locals.messages.errors) { %> <% messages.errors.forEach( el => { %>
            <div class="alert alert-error">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><%= el.msg %></span>
              </div>
            </div>
            <% }) %> <% } %> <% if (locals.messages.info) { %> <%
            messages.info.forEach( el => { %>
            <div class="alert alert-info">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><%= el.msg %></span>
              </div>
            </div>
            <% }) %> <% } %> */}
            <form class="grid grid-cols-2 gap-y-4" action="/login" method="POST">
              <div class="form-control col-span-2">
                <label for="exampleInputEmail1" class="label">
                  <span class="label-text">Email address</span>
                </label>
                <input type="email" class="input input-bordered" id="exampleInputEmail1" name="email"/>
                <small>For testing purposes, login is: bob@bob.com</small>
              </div>
              <div class="form-control col-span-2">
                <label for="exampleInputPassword1" class="label">
                  <span class="label-text">Password</span>
                </label>
                <input type="password" class="input input-bordered" id="exampleInputPassword1" name="password"/>
                <small>Password for bob@bob.com: bobbobbob</small>
              </div>
              <div class="col-span-2 flex justify-center gap-4 mt-4">
                <button type="submit" class="btn btn-primary">Submit</button>
                <a href="/" class="btn btn-primary btn-outline">Cancel</a>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
