import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateProductRequestDto,
  GetProductRequestDto,
  GetExtendedProductRequestDto,
  GetCategoryDto,
  GetProductQueryDto,
} from './dto';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @ApiOperation({ summary: 'add new product' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post()
  addProduct(@Body() product: CreateProductRequestDto) {
    return this.productService.addProduct(product);
  }

  @ApiOperation({ summary: 'get all products or products by different params' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProductRequestDto,
    isArray: true,
  })
  @Get()
  getAll(@Query() params: GetProductQueryDto) {
    return this.productService.getAll(params);
  }

  @ApiOperation({ summary: 'get products by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProductRequestDto,
    isArray: true,
  })
  @ApiParam({
    name: 'id',
    enum: ['1', '2', '1,2'],
  })
  @Get('products:ids')
  getProductsById(
    @Param('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return this.productService.getProductsById(ids);
  }

  @ApiOperation({ summary: 'get extended information about one product' })
  @ApiResponse({ status: HttpStatus.OK, type: GetExtendedProductRequestDto })
  @ApiParam({ name: 'id', enum: ['1', '2', '15'] })
  @Get('/extended/:id')
  getExtendedProductById(@Param('id') id: number) {
    return this.productService.getExtendedProduct(id);
  }

  @ApiOperation({ summary: 'get extended information about one product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCategoryDto,
    isArray: true,
  })
  @Get('/categories')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
