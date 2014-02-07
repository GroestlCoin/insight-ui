'use strict';

angular.module('insight.system').controller('HeaderController',
  function($scope, $rootScope, getSocket, Global, Block) {
  $scope.global = Global;

  $rootScope.currency = {
    factor: 1,
    bitstamp: 0,
    symbol: 'BTC'
  };

  $scope.menu = [
    {
      'title': 'Blocks',
      'link': 'blocks'
    },
    {
      'title': 'Status',
      'link': 'status'
    }
  ];

  var socket = getSocket($scope);
  socket.emit('subscribe', 'inv');

  var _getBlock = function(hash) {
    Block.get({
      blockHash: hash
    }, function(res) {
      $scope.totalBlocks = res.height;
    });
  };

  socket.on('block', function(block) {
    var blockHash = block.hash.toString();
    console.log('Updated Blocks Height!');
    _getBlock(blockHash);
  });

  $rootScope.isCollapsed = true;
});