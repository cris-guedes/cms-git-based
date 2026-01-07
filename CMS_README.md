# Sveltia CMS - Configuração Completa

Este projeto agora está configurado com o **Sveltia CMS** para gerenciamento de páginas estáticas.

## 📁 Estrutura do Projeto

```
cms-simple/
├── public/
│   └── admin/
│       ├── index.html      # Interface do CMS
│       └── config.yml      # Configuração do CMS
├── content/
│   ├── pages/              # Páginas estáticas (gerenciadas pelo CMS)
│   │   └── home.md         # Página de exemplo
│   └── media/              # Arquivos de mídia (imagens, etc.)
└── ...
```

## 🚀 Como Usar

### 1. Configurar o Repositório GitHub

Antes de usar o CMS em produção, você precisa:

1. **Editar o arquivo `public/admin/config.yml`**:
   ```yaml
   backend:
     name: github
     repo: seu-usuario/seu-repositorio  # ← ALTERE AQUI
     branch: main
   ```

2. **Criar um OAuth App no GitHub**:
   - Acesse: https://github.com/settings/developers
   - Clique em "New OAuth App"
   - Preencha:
     - **Application name**: Sveltia CMS
     - **Homepage URL**: `https://seu-site.com`
     - **Authorization callback URL**: `https://api.netlify.com/auth/done` (se usar Netlify) ou configure seu próprio servidor de autenticação
   - Anote o **Client ID** e **Client Secret**

### 2. Desenvolvimento Local

Para testar localmente com o **Test Backend** (sem GitHub):

1. Edite `public/admin/config.yml` temporariamente:
   ```yaml
   backend:
     name: test-repo
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```

3. Acesse: **http://localhost:5173/admin/**

4. O CMS carregará e você poderá criar/editar páginas localmente

### 3. Acessar o CMS

- **URL do CMS**: `http://localhost:5173/admin/` (desenvolvimento)
- **URL do CMS**: `https://seu-site.com/admin/` (produção)

### 4. Criar uma Nova Página

1. Acesse o CMS
2. Clique em "Páginas" no menu lateral
3. Clique em "Nova Página"
4. Preencha os campos:
   - **Título**: Nome da página
   - **Descrição**: Para SEO
   - **URL/Slug**: URL amigável (ex: `sobre`, `contato`)
   - **Conteúdo**: Use Markdown para escrever o conteúdo
5. Clique em "Publicar"

## 📝 Campos Disponíveis

Cada página possui os seguintes campos:

- **Título**: Título principal da página
- **Descrição**: Meta description para SEO
- **URL/Slug**: URL amigável da página
- **Imagem Destacada**: Imagem principal (opcional)
- **Conteúdo**: Conteúdo em Markdown
- **Data de Publicação**: Data/hora de publicação
- **Publicado**: Status de publicação (true/false)
- **Ordem**: Ordem de exibição no menu

## 🔧 Personalização

### Adicionar Novos Campos

Edite `public/admin/config.yml` e adicione campos na seção `fields`:

```yaml
- label: Seu Novo Campo
  name: nome_do_campo
  widget: string  # ou text, markdown, image, etc.
  required: false
```

### Widgets Disponíveis

- `string`: Texto curto
- `text`: Texto longo
- `markdown`: Editor Markdown
- `boolean`: Checkbox
- `datetime`: Data e hora
- `image`: Upload de imagem
- `file`: Upload de arquivo
- `number`: Número
- `select`: Lista de opções
- `relation`: Relacionamento com outra collection

## 📚 Documentação

- [Sveltia CMS Docs](https://sveltiacms.app/en/docs)
- [Configuração de Backend](https://sveltiacms.app/en/docs/backends)
- [Widgets de Campo](https://sveltiacms.app/en/docs/fields)

## 🔐 Segurança

O arquivo `public/admin/index.html` inclui:
```html
<meta name="robots" content="noindex" />
```

Isso impede que motores de busca indexem a página de administração.

## 🎯 Próximos Passos

1. ✅ Configurar repositório GitHub no `config.yml`
2. ✅ Criar OAuth App no GitHub
3. ✅ Testar criação de páginas
4. ✅ Integrar páginas no seu código React Router
5. ✅ Deploy para produção

---

**Nota**: O Sveltia CMS salva as páginas como arquivos Markdown com frontmatter YAML na pasta `/content/pages`. Você pode ler esses arquivos no seu código React Router para renderizar as páginas dinamicamente.
