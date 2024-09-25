describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html');
      })

    it('Verifica o título da aplicação', function() {
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
      const textoGrande = "A alfabetização é uma fase primordial no desenvolvimento das crianças. Para isso, é preciso ser o mais didático possível no processo de aprendizagem de leitura e interpretação dos pequenos. Materiais simples e de tamanhos pequenos são essenciais nessa ocasião. Geralmente, para atrair alunos de séries iniciais, são usados textos com alguma história simples e com desenhos. Vale ressaltar que o hábito da leitura e da interpretação aumenta o conhecimento e ajuda na construção textual."
        cy.get('#firstName').type("Vitor")
        cy.get('#lastName').type('Silva Leal')
        cy.get('#email').type('vitorlealengenharia@gmail.com')
        cy.get('#phone').type('34992433435')
        cy.get('#open-text-area').type(textoGrande, ({delay : 0}))
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        
    }
   )

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Vitor')
      cy.get('#lastName').type('Silva Leal')
      cy.get('#email').type('vitorlealengenharia@gmailcom')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

    }

    )

    it('Validar campo Telefone vazio ao digitar um valor não-numérico', function() {
        cy.get('#firstName').type("Vitor")
        cy.get('#lastName').type('Silva Leal')
        cy.get('#email').type('vitorlealengenharia@gmail.com')
        cy.get('#phone').type('Teste')
        cy.get('#phone').should('have.value', '')
    }


    )

    it('Exiber mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Vitor')
      cy.get('#lastName').type('Silva Leal')
      cy.get('#email').type('vitorlealengenharia@gmail.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('TESTE')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    }

    )

    it('Preencher e limpar os campos nome, sobrenome, email e telefone', function() {

      cy.get('#firstName').type('Vitinho').should('have.value','Vitinho').clear().should('have.value', '')
      cy.get('#lastName').type('Silva Leal').should('have.value','Silva Leal').clear().should('have.value','')
      cy.get('#email').type('vitorlealengenharia@gmail.com').should('have.value','vitorlealengenharia@gmail.com').clear().should('have.value','')
      cy.get('#phone').type('34992433435').should('have.value','34992433435').clear().should('have.value','')     

    }

    )

    it('Exiber mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible','')
    }

    )

    it('Enviar o formuário com sucesso usando um comando customizado', function () {
      cy.fillMandatoryFieldsAndSubmit()

    }

    )

    it('Selecionar um produto (YouTube) por seu texto', function() {

      cy.get('#product').select('YouTube').should('have.value' , 'youtube')

    })

    it( "Selecionar um produto (Mentoria) por seu valor (value)", function() {
      cy.get('select').select('mentoria').should('have.value' , 'mentoria')
    }

    )

    it('Seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product').select(1).should('have.value','blog')

    })
    

    it('Marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type = "radio"]').check('feedback')
        .should('have.value', 'feedback')
    }

    )
    it('Marca cada tipo de atendimento', function() {
      cy.get('input[type = "radio"]')
        .should('have.length' , 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    }

    )
    it('Marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')


    })

    it('Revisado > Exiber mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Vitor')
      cy.get('#lastName').type('Silva Leal')
      cy.get('#email').type('vitorlealengenharia@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('TESTE')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    }

    )

    it('Seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type = "file"]')
      .selectFile('cypress/fixtures/example.json')
      .then ( input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')

      })

    })

    it('Seleciona um arquivo simulando um drag-and-drop', () =>{
      cy.get('input[type = "file"]')
      .selectFile("cypress/fixtures/example.json", {action: "drag-drop"})
      .then(input =>{
        
        expect(input[0].files[0].name).to.equal('example.json')

      })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('ArquivoExemplo')
      cy.get('input[type="file"]')
      .selectFile('@ArquivoExemplo')
      .then(input =>{
        
        expect(input[0].files[0].name).to.equal('example.json')

      })
      
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){

      cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    })
    

    it("Acessa a página da política de privacidade removendo o target e então clicando no link", function(){
      cy.get('a').invoke('removeAttr', 'target').click()
      cy.contains("Talking About Testing").should('be.visible','Talking About Testing')
      
    })



  })