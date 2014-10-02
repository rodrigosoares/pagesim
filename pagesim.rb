# encoding: utf-8
LARGURA_JANELA = 600
ALTURA_JANELA = 600
COR_FUNDO = "#F2F3F4"
COR_BORDA = "#5D8AA8"
MARGEM = 20
TITULO = 'PageSim'

Shoes.app width: LARGURA_JANELA, height: ALTURA_JANELA, title: TITULO do
  background COR_FUNDO
  border COR_BORDA, strokewidth: 6

  stack margin: MARGEM do
    para strong 'Simulador de Algoritmos de Substituição de Página'
    para em 'Desenvolvido por Rodrigo Soares'
  end

  stack margin: MARGEM do
    flow do
      @botao = button 'Botão 1'
      @nota = para 'Botão ainda não pressionado.'
      @botao.click do
        @nota.replace 'Botão clicado!'
      end
    end
  end
end