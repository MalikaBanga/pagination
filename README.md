# Simple jQuery pagination
Paginate through list/grids.

### Installing
Download or Clone the files, add it in your project.
Enqueue your files.

Add this in the `<head>` tag:

```
<link rel="stylesheet" href="<path_to_folder>/css/jQueryPagination.min.css" />
```

Before closing `<body>` tag add:
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="<path_to_folder>/js/jQueryPagination.min.js"></script>
```

### Invoke pagination
```
<ul id="paginate">
	<li>Cras justo odio</li>
	<li>Dapibus ac facilisis in</li>
	<li>Morbi leo risus</li>
	<li>Cras justo odio 1</li>
	<li>Dapibus ac facilisis in 1</li>
	<li>Morbi leo risus 1</li>
	<li>Cras justo odio 2</li>
	<li>Dapibus ac facilisis in 2</li>
	<li>Morbi leo risus 2</li>
	<li>Cras justo odio 3</li>
	<li>Dapibus ac facilisis in 3</li>
	<li>Morbi leo risus 3</li>
</ul>
```
Script:
```
<script>
	jQuery('#paginate').mbPagination();
</script>
```

### Options

Options | Type | Default | Description
------ | ---- | ------- | -----------
perPage | number | 10 | Number of items per page.
prevText | string | &#10092; | Previous arrow text/icon.
nextText | string | &#10093; | Next arrow text/icon.
showFirstLast | boolean | false | Show First & Last page arrows.
firstText | string | &#10092;&#10092; | First page arrow/text/icon.
lastText | string | &#10093;&#10093; | Last page arrow/text/icon.


#### Pagination Example
![Pagination](https://raw.githubusercontent.com/MalikaBanga/pagination/screenshots/pagination.jpg)
```
<script>
	jQuery('#paginate').mbPagination({
		showFirstLast: true,
		perPage: 5,
	});
</script>
```

## Live Demo
https://malikabanga.github.io/work/pagination/