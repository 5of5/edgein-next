import { aliasQuery } from "@/utils/graphql-test-util"

describe('Users', () => { 
    beforeEach(() => {
        cy.intercept('POST', '/', (req) => {
            aliasQuery(req, 'users')
        })
    })

    it('', () => {
        
    })
})