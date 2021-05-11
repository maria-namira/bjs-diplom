'use strict';

const logout = new LogoutButton();
	logout.action = () => {
	    ApiConnector.logout(response => {
	        if (response.success) {
	            location.reload();
	     } 
	 });
};
	ApiConnector.current(response => {
	    if (response.success) {
	        ProfileWidget.showProfile(response.data);
	     }
});
	const ratesboard = new RatesBoard();
	function ratesShower() {
	    ApiConnector.getStocks(response => {
	        if (response.success) {
	            ratesboard.clearTable();
	            ratesboard.fillTable(response.data);
	     }
	 });
}
	ratesShower();
	setInterval(ratesShower, 60000);
	const moneymanager = new MoneyManager();
	moneymanager.addMoneyCallback = data => {
	    ApiConnector.addMoney(data, response => {
	        if (response.success) {
	            ProfileWidget.showProfile(response.data);
	     }
	        if (response.success) {
	            moneymanager.setMessage(response.success, 'Успешное добавление баланса');
	     } else {
	            moneymanager.setMessage(response.success, response.error);
	     }
	 });  
};
	moneymanager.conversionMoneyCallback = data => {
	    ApiConnector.convertMoney(data, response => {
	        if (response.success) {
	            ProfileWidget.showProfile(response.data);
	     }
	        if (response2.success) {
	            moneymanager.setMessage(response.success, 'Успешное конвертирование');
	     } else {
	            moneymanager.setMessage(response.success, response.error);
	     }
	 });
};
	moneymanager.sendMoneyCallback = data => {
	    ApiConnector.transferMoney(data, response => {
	        if (response.success) {
	            ProfileWidget.showProfile(response.data);
	     }
	        if (response.success) {
	            moneymanager.setMessage(response.success, response.error || 'Успешная передача');
	     } 
	 });
};
	const favoriteswidget = new FavoritesWidget();
	ApiConnector.getFavorites(response => {
	    if (response.success) {
	        favoriteswidget.clearTable();
	        favoriteswidget.fillTable(response.data);
	        moneymanager.updateUsersList(response.data);
	    }
});
	getFavorites();
    favoriteswidget.addUserCallback = data => {
	    ApiConnector.addUserToFavorites(data, response => {
	        if (response.success) {
	            favoriteswidget.clearTable();
	            favoriteswidget.fillTable(response.data);
	            moneymanager.updateUsersList(response.data);
	     }
	        if (response.success) {
	            favoriteswidget.setMessage(response.success, response.error || 'Успешное добавление в избранное');
	            getFavorites();
	     } 
     });
};
	favoriteswidget.removeUserCallback = data => {
	    ApiConnector.removeUserFromFavorites(data, response => {
	        if (response.success) {
	            favoriteswidget.clearTable();
	            favoriteswidget.fillTable(response.data);
	            moneymanager.updateUsersList(response.data);
	      }
	        if (response.success) {
	            favoriteswidget.setMessage(response.success, response.error || 'Успешнок удаление из избранного');
	            getFavorites();
	      } 
	 });
};

