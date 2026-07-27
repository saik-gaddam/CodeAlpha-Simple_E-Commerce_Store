from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Product, Order

def product_list(request):
    products = Product.objects.all()
    return render(request, 'store/product_list.html', {'products': products})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'store/product_detail.html', {'product': product})

@login_required
def cart_view(request):
    cart = request.session.get('cart', {})
    products = Product.objects.filter(id__in=cart.keys())
    cart_items = [{'product': p, 'quantity': cart[str(p.id)]} for p in products]
    total = sum(item['product'].price * item['quantity'] for item in cart_items)
    return render(request, 'store/cart.html', {'cart_items': cart_items, 'total': total})

def add_to_cart(request, pk):
    cart = request.session.get('cart', {})
    cart[str(pk)] = cart.get(str(pk), 0) + 1
    request.session['cart'] = cart
    return redirect('cart_view')

@login_required
def checkout(request):
    cart = request.session.get('cart', {})
    if not cart:
        return redirect('product_list')
    
    products = Product.objects.filter(id__in=cart.keys())
    total = sum(p.price * cart[str(p.id)] for p in products)

    if request.method == 'POST':
        address = request.POST.get('address')
        Order.objects.create(user=request.user, total_price=total, shipping_address=address)
        request.session['cart'] = {}
        return render(request, 'store/product_list.html', {'message': 'Order placed successfully!'})
    
    return render(request, 'store/cart.html', {'total': total, 'checkout': True})
