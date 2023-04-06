---
citekey: {{citekey}}
aliases: [{% if shortTitle %}"{{shortTitle | safe}}"{% else %}"{{title | safe}}"{% endif %}]
title: "{{title}}"
authors: {{authors}}
tags: [literature-note, {% for t in tags %}{{t.tag}}{% if not loop.last %}, {% endif %}{% endfor %}]
year: {{date | format("YYYY")}}
publisher: "{{publicationTitle}}"
doi: {{DOI}}
---

# [{{title}}]({{desktopURI}})

 >[!info]+
>{% if bibliography %}**Bibliography:** {{bibliography}}{% endif %}
>
>**Page-no:** {% for annotation in annotations %}{% if loop.first %}{{annotation.pageLabel}}{% endif %}{% endfor %}
>
>{% if hashTags %}**Tags:** {{hashTags}}{% endif %}
>
>{%- for attachment in attachments | filterby("path", "endswith", ".pdf") %}**PDF:** [{{attachment.title}}](file:///{{attachment.path | replace(" ", "%20")}}){%- endfor %}
>
>[**Open in Zotero**]({{desktopURI}})
>[**Open DOI**](https://doi.org/{{DOI}})

> [!abstract]-
> {% if abstractNote %}
> {{abstractNote|replace("\n"," ")}}
> {% endif %}
 
---

## Notes
{% macro heading(color) -%}
{%- if color == "#5fb236" -%}
💡 Main ideas, contributions and conclusions
{%- endif -%}
{%- if color == "#2ea8e5" -%}
❔ Questions
{%- endif -%}
{%- if color == "#ffd400" -%}
⭐ Important
{%- endif -%}
{%- if color == "#a28ae5" -%}
🧩 Definitions and concepts
{%- endif -%}
{%- if color == "#ff6666" -%}
⛔ Weaknesses and caveats
{%- endif -%}
{%- endmacro -%}


{% persist "annotations" %}
{% set annotations = annotations | filterby("date", "dateafter", lastImportDate) -%}
{% if annotations.length > 0 %}

*Imported on {{importDate | format("YYYY-MM-DD HH:mm")}}*

{% for color, annotations in annotations | groupby("color") -%}

### {{heading(color)}}

{%- for annotation in annotations -%}
{%- if annotation.imageRelativePath %}
![[{{annotation.imageRelativePath}}]]
{%- endif %}
{%- if annotation.comment %}
- **{{annotation.comment}}:**
	- =={{annotation.annotatedText | nl2br}}== [(p. {{annotation.pageLabel}})](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.pageLabel}}&annotation={{annotation.id}}) {% if annotation.hashTags %}{{annotation.hashTags}}{% endif %}
{%- elif annotation.annotatedText %}
- =={{annotation.annotatedText | nl2br}}== [(p. {{annotation.pageLabel}})](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.pageLabel}}&annotation={{annotation.id}}) {% if annotation.hashTags %}{{annotation.hashTags}}{% endif %}
{%- endif -%}{%- endfor %}

{% endfor -%}
{% endif %}
{% endpersist %}>)