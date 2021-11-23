package com.example.demo.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping
    public List<Book> addNewBook(@RequestParam("file")MultipartFile file,
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
            @RequestParam("file")MultipartFile file,
            @RequestParam("bookName") String bookName,
            @RequestParam("author") String author,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price){

        String path = null;

        if(!file.isEmpty()){
            Book book = bookService.getBook(id);
            bookService.deleteInvoice(book.getInvoicePath());
            path = bookService.uploadInvoice(file);
        }
        bookService.updateBook(id, bookName,author,price,quantity,path);

        return bookService.getBook(id);
    }

    @DeleteMapping(path = "{bookId}")
    public Long deleteBook(@PathVariable("bookId") Long id){
        Book book = bookService.getBook(id);
        bookService.deleteInvoice(book.getInvoicePath());
        bookService.deleteBook(id);

        return id;
    }

}
