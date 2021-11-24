package com.example.demo.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getBooks(){
        return bookService.getBooks();
    }

    @GetMapping(path = "{bookId}")
    public Book getBookById(@PathVariable("bookId") Long id){
        return bookService.getBook(id);
    }

    @PostMapping
    public List<Book> addNewBook(@RequestParam("invoice")MultipartFile file,
                           @RequestParam("bookName") String bookName,
                           @RequestParam("author") String author,
                           @RequestParam("quantity") int quantity,
                           @RequestParam("price") double price){
        Book book = new Book();

        String path = null;

        if(!file.isEmpty()){
            path = bookService.uploadInvoice(file);
        }

        book.setBookName(bookName);
        book.setAuthor(author);
        book.setPrice(price);
        book.setQuantity(quantity);
        book.setInvoicePath(path);

        bookService.saveBook(book);

        return bookService.getBooks();
    }

    @PutMapping(path = "{bookId}")
    public Book updateBook(
            @PathVariable("bookId") Long id,
            @RequestParam(required = false, name = "invoice")MultipartFile file,
            @RequestParam(required = false, name = "bookName") String bookName,
            @RequestParam(required = false, name = "author") String author,
            @RequestParam(required = false, name = "quantity") int quantity,
            @RequestParam(required = false, name = "price") double price){

        String path = null;
        Book book = bookService.getBook(id);
        if(book.getInvoicePath() != null && !"".equals(book.getInvoicePath()))
            path = book.getInvoicePath();


        if(file != null){
            if(book.getInvoicePath() != null && !"".equals(book.getInvoicePath()))
                bookService.deleteInvoice(book.getInvoicePath());

            path = bookService.uploadInvoice(file);
        }

        bookService.updateBook(id, bookName,author,price,quantity,path);

        return bookService.getBook(id);
    }

    @DeleteMapping(path = "{bookId}")
    public Long deleteBook(@PathVariable("bookId") Long id){
        Book book = bookService.getBook(id);
        if(book.getInvoicePath() != null && !"".equals(book.getInvoicePath())){
            bookService.deleteInvoice(book.getInvoicePath());
        }
        bookService.deleteBook(id);

        return id;
    }

    @GetMapping(path = "invoice/{fileName}")
    public ResponseEntity getInvoice(@PathVariable("fileName") String fileName, HttpServletRequest request){

        Path path = Paths.get("/upload", fileName);
        Resource resource = null;
        String contentType = null;

        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException e) {
            System.out.print("Could not determine file type.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
