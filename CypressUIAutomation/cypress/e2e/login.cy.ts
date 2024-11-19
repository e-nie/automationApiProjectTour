describe('LOGIN', () => {
    it('Login Page', () => {
        cy.visit('https://automationteststore.com/index.php?rt=account/login')
        cy.get('[id="loginFrm_loginname"]').type('pasvtestuser')
        cy.get('[id="loginFrm_password"]').type('test1234')
        cy.get('[title="Login"]').click()
        cy.contains('My Account').should('be.visible')
        cy.contains('Welcome back test').should('be.visible')

    })

    describe('Login - Orange website', () => {
        it('Login - valid creds', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            cy.get('input[name="username"]').type('Admin')
            cy.get('input[name="password"]').type('admin123')
            cy.get('button[type="submit"]').click()
            cy.get('.oxd-loading-spinner').should('be.visible');
            //cy.contains('Dashboard').should('be.visible')
            cy.get('.oxd-text--h6').should('be.visible')
            cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
        })

        it('Login - invalid password', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            cy.get('input[name="username"]').type('Admin')
            cy.get('input[name="password"]').type('wrong123')
            cy.get('button[type="submit"]').click()
            cy.get('.oxd-alert-content-text').should('be.visible').and('have.text', 'Invalid credentials')
        })
    })

    describe('Login Page - PASV', () => {
        it('Login Page - valid creds', () => {
            cy.visit('https://coding.pasv.us/user/login')
            cy.get('[id="normal_login_email"]').type('vl1vl@yahoo.com')
            cy.get('[id="normal_login_password"]').type('57ThTRTV99qf!5L')
            cy.get('[type="submit"]').click()
            //cy.contains('a', 'Курсы').should('have.attr', 'href', '/course');
            cy.get('h1').should('have.text', 'Eva Niehaus')
            cy.url().should('include', '/profile');
            cy.contains('Diary').should('be.visible')
        })

        it('Login Page - invalid creds', () => {
            cy.visit('https://coding.pasv.us/user/login')
            cy.get('[id="normal_login_email"]').type('vl1vl@yahoo.com')
            cy.get('[id="normal_login_password"]').type('wrongPassword')
            cy.get('[type="submit"]').click()
            cy.get('.ant-notification-notice-message').should('contain.text', 'User login. Fail')
        })
    })

    describe('Login Page - The Internet App - Heroku', () => {
        beforeEach(() => {
            cy.visit('https://the-internet.herokuapp.com/login')
        })

        it('Login Page - valid creds', () => {
            cy.get('[id="username"]').type('tomsmith')
            cy.get('[id="password"]').type('SuperSecretPassword!')
            cy.get('button[type="submit"]').click()
            cy.contains('h2', 'Secure Area').should('be.visible')
            cy.url().should('eq', 'https://the-internet.herokuapp.com/secure')
            cy.url().should('include', '/secure')
            cy.get('.flash.success').should('contain', 'You logged into a secure area!')
        })
        it('Login Page - invalid creds', () => {
            cy.get('[id="username"]').type('invalidUser')
            cy.get('[id="password"]').type('invalidPassword!')
            cy.get('button[type="submit"]').click()
            cy.get('.flash.error').should('contain', ' Your username is invalid!')
        })
        it('Login Page - no password provided', () => {
            cy.get('[id="username"]').type('tomsmith')
            cy.get('button[type="submit"]').click()
            cy.get('.flash.error').should('contain', ' Your password is invalid!')
        })
    })

    describe('Login Page DEMO-QA', () => {
        it('Login Page DEMO-QA - with valid creds', () => {
            cy.visit('https://demoqa.com/login')
            cy.get('[id="userName"]').type('EvchenNie')
            cy.get('[id="password"]').type('Evchen!1108')
            cy.get('[id="login"]').click()
            cy.get('[id="userName-value"]').should('be.visible').and('have.text', 'EvchenNie')
        })
    })

    it('Login Page DEMO-QA - with invalid creds', () => {
        cy.visit('https://demoqa.com/login')
        cy.get('[id="userName"]').type('EvchenNie')
        cy.get('[id="password"]').type('Evchen!11')
        cy.get('[id="login"]').click()
        cy.get('#name').should('be.visible').and('have.text', 'Invalid username or password!')
    })
})


/*
user: pasvtestuser
Pwd: test1234
 */
